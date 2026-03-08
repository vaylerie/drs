"use client";
import { getApps, initializeApp } from "firebase/app";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";

// Get firebase config from firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyCVPWGqmxPd-uLXa7AB0RFE2_UzQopafps",
  authDomain: "drsys-0212.firebaseapp.com",
  projectId: "drsys-0212",
  storageBucket: "drsys-0212.appspot.com",
  messagingSenderId: "548411353100",
  appId: "1:548411353100:web:201f8bdb832bbc81e66629"
};

const currentApps = getApps();

let auth: Auth | undefined = undefined;

if (currentApps.length <= 0) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    if (
        process.env.NEXT_PUBLIC_APP_ENV === "emulator" &&
        process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH
    ) {
        connectAuthEmulator(
            auth,
            `http://${process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH}`
        );
    }
} else {
    auth = getAuth(currentApps[0]);
    if (
        process.env.NEXT_PUBLIC_APP_ENV === "emulator" &&
        process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH
    ) {
        connectAuthEmulator(
            auth,
            `http://${process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH}`
        );
    }
}

export { auth };
