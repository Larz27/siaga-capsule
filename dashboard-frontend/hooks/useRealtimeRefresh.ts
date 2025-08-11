"use client";

import { useEffect, useRef } from 'react';
import { onSnapshot, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

export function useRealtimeRefresh(onRefresh?: () => void) {
  const lastSubmissionTimeRef = useRef<number | null>(null);
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    const q = query(
      collection(db, 'submissions'),
      orderBy('submittedAt', 'desc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {      
      if (!snapshot.empty) {
        const latestSubmission = snapshot.docs[0];
        const submissionTime = latestSubmission.data().submittedAt?.toMillis();

        if (isInitialLoadRef.current) {
          lastSubmissionTimeRef.current = submissionTime;
          isInitialLoadRef.current = false;
          return;
        }

        if (submissionTime && lastSubmissionTimeRef.current && submissionTime > lastSubmissionTimeRef.current) {
          console.log('New submission detected, refreshing page...');
          
          const handleRefresh = onRefresh || (() => window.location.reload());
          
          toast.info('New entry received! Page will refresh in 5 seconds', {
            duration: 5000,
            action: {
              label: 'Refresh Now',
              onClick: handleRefresh
            }
          });
          
          setTimeout(() => {
            handleRefresh();
          }, 5000);
        }

        lastSubmissionTimeRef.current = submissionTime;
      }
    });

    return () => unsubscribe();
  }, []);
  return null;
}
