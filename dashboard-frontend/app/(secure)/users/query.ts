"use server";

import { collection, getDocs, query, where, orderBy, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getPublicSubmissions() {
  try {
    const submissionsRef = collection(db, "submissions");

    let q;

    // Fetch only public submissions
    q = query(
      submissionsRef,
      where("isPrivate", "==", false),
      orderBy("submittedAt", "desc")
    );

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
        isFeatured: data.isFeatured || false,
        submittedAt: data.submittedAt?.toDate?.()
          ? data.submittedAt.toDate().toISOString()
          : data.submittedAt || null,
      };
    });

    return submissions;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return [];
  }
}

export async function toggleSubmissionFeatured(submissionId: string, isFeatured: boolean) {
  try {
    // Get reference to the specific submission document
    const submissionRef = doc(db, "submissions", submissionId);
    
    // Update the isFeatured field
    await updateDoc(submissionRef, {
      isFeatured: isFeatured,
      // Add a timestamp for when the featured status was last updated
      featuredUpdatedAt: new Date()
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating submission featured status:", error);
    throw new Error("Failed to update featured status");
  }
}
