import { onUserCreated, AuthEvent } from "firebase-functions/v2/auth";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

initializeApp();

const db = getFirestore();
const auth = getAuth();

export const onUserCreate = onUserCreated(async (event: AuthEvent) => {
  const user = event.data;

  if (!user.email) return;

  if (user.email === "admin@example.com") {
    await db.doc(`users/${user.uid}`).set({
      isPro: true,
    });

    try {
      await auth.setCustomUserClaims(user.uid, {
        role: "admin",
      });
    } catch (error) {
      console.log(error);
    }

    return;
  }

  if (user.email === "pro@example.com") {
    await db.doc(`users/${user.uid}`).set({
      isPro: true,
    });
    return;
  }

  await db.doc(`users/${user.uid}`).set({
    isPro: false,
  });
});
