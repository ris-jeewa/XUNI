import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const { createContext, useEffect, useState, useContext } = require("react");

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUserData(user.uid);
        setUser({
          uid: user.uid,
          email: user.email,
          ...userData, // Includes profileUrl, username, etc.
        });
        setIsAuthenticated(true);
        console.log("user data ", userData);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

//   const updateUserData = async (userId) => {
//     const docRef = doc(db, "users", userId);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       let data = docSnap.data();
//       setUser({
//         ...user,
//         username: data.username,
//         profileUrl: data.profileUrl,
//         userId: data.userId,
//       });
//     }
//   };

const getUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };
  

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      let msg = err.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      if (msg.includes("(auth/user-not-found)")) msg = "User not found";
      if (msg.includes("(auth/invalid-credential)"))
        msg = "Wrong Credentials. Try again later";
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (err) {
      return { success: false, msg: err.message, error: err };
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("use res ", response?.user);
      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid,
      });

      return { success: true, data: response?.user };
    } catch (err) {
      let msg = err.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "Email you provided already in use";
      if (msg.includes("(auth/weak-password)")) msg = "Password is too weak";
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within an AuthContextProvider.");
  }
  return value;
};
