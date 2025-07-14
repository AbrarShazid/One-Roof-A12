import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut  } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { createContext } from "react";
import { auth } from '../firebase/firebase.init';

export const AuthContext = createContext()



const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const googleProvider = new GoogleAuthProvider()

  const createUser = (email, password) => {
    setLoading(true)

    return createUserWithEmailAndPassword(auth, email, password)

  }


  const signIn = (email, password) => {
    setLoading(true)

    return signInWithEmailAndPassword(auth, email, password)

  }
  const signInGoogle = () => {
    setLoading(true)

    return signInWithPopup(auth, googleProvider)
  }

  const logOut = () => {
    setLoading(true)

    return signOut(auth)


  }

  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSub();
    };



  },[])






  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInGoogle,
    logOut


  }



  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;