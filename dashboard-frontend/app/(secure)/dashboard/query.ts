"use server";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getSubmissions(isPrivate?: boolean | null) {
  try {
    const submissionsRef = collection(db, "submissions");

    let q;
    if (isPrivate === true) {
      // Fetch only private submissions
      q = query(
        submissionsRef,
        where("isPrivate", "==", true),
        orderBy("submittedAt", "desc")
      );
    } else if (isPrivate === false) {
      // Fetch only public submissions
      q = query(
        submissionsRef,
        where("isPrivate", "==", false),
        orderBy("submittedAt", "desc")
      );
    } else {
      // Fetch all submissions (isPrivate is null/undefined)
      q = query(submissionsRef, orderBy("submittedAt", "desc"));
    }

    const snapshot = await getDocs(q);

    const submissions = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email || "",
        age: Number(data.age) || 0,
        district: data.district || "",
        occupationStatus: data.occupationStatus || "",
        otherOccupation: data.otherOccupation || "",
        sectorInterest: data.sectorInterest || "",
        otherSector: data.otherSector || "",
        values: data.values || [],
        obstacles: data.obstacles || [],
        question1: data.question1 || "",
        isPrivate: data.isPrivate || false,
        submittedAt: data.submittedAt?.toDate?.()
          ? data.submittedAt.toDate().toISOString()
          : data.submittedAt || null,
        isFeatured: data.isFeatured || false,
        question1Highlighted: data.question1Highlighted || "",
      };
    });

    return submissions;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return [];
  }
}

export async function getSubmissionCount(isPrivate?: boolean | null) {
  try {
    const submissionsRef = collection(db, "submissions");

    let q;
    if (isPrivate === true) {
      q = query(submissionsRef, where("isPrivate", "==", true));
    } else if (isPrivate === false) {
      q = query(submissionsRef, where("isPrivate", "==", false));
    } else {
      q = query(submissionsRef);
    }

    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.error("Error fetching submission count:", error);
    return 0;
  }
}
