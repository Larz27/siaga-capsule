"use server";

import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { adminDb } from "@/lib/firebase-admin";

export async function getPublicSubmissions() {
  try {
    const submissionsRef = collection(db, "submissions");

    // Fetch only public submissions
    const q = query(
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
        question1Highlighted: data.question1Highlighted || "",
        question1HighlightedUpdatedAt: data.question1HighlightedUpdatedAt?.toDate?.()
          ? data.question1HighlightedUpdatedAt.toDate().toISOString()
          : data.question1HighlightedUpdatedAt || null,
        featuredUpdatedAt: data.featuredUpdatedAt?.toDate?.()
          ? data.featuredUpdatedAt.toDate().toISOString()
          : data.featuredUpdatedAt || null,
      };
    });

    return submissions;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return [];
  }
}

export async function toggleSubmissionFeatured(
  submissionId: string,
  isFeatured: boolean
) {
  try {
    // Get reference to the specific submission document
    await adminDb.collection("submissions").doc(submissionId).update({
      isFeatured: isFeatured,
      featuredUpdatedAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating submission featured status:", error);
    throw new Error("Failed to update featured status");
  }
}

export async function updateQuestion1Highlighted(
  submissionId: string,
  question1Highlighted: string
) {
  try {
    await adminDb.collection("submissions").doc(submissionId).update({
      question1Highlighted: question1Highlighted,
      question1HighlightedUpdatedAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating question1Highlighted:", error);
    throw new Error("Failed to update question1Highlighted");
  }
}
