import {
  QuizSpanSliceStateType,
  UserResponseType,
} from "@customTypes/quizSpanSlice.type";
import { db } from "@redux/firebase";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { format } from "date-fns";

// Funxtion to post quiz data to firebase
export const publishQuizData = async (
  quizData: QuizSpanSliceStateType,
  quizId: string,
) => {
  return toast.promise(
    async () => {
      try {
        const quizRef = doc(db, "quiz", quizId);
        await setDoc(quizRef, quizData);
      } catch (error) {
        console.error("Error saving quiz data:", error);
        throw error;
      }
    },
    {
      pending: "Saving quiz data...",
      success: "Quiz data saved successfully!",
      error: {
        render({ data }) {
          console.error("Toast error:", data);
          return "Error saving Quiz data";
        },
      },
    },
  );
};

// Function to load all quizes from Firestore
export const loadAllQuizes = async () => {
  try {
    const quizCollection = collection(db, "quiz");
    const querySnapshot = await getDocs(quizCollection);
    const quiz: { [id: string]: QuizSpanSliceStateType } = {};

    querySnapshot.forEach((doc) => {
      quiz[doc.id] = doc.data() as QuizSpanSliceStateType;
    });
    return quiz;
  } catch (error) {
    console.error("Error loading all quiz data:", error);
    return null;
  }
};

// Function to load quiz data from Firestore
export const loadQuiz = async (quizId: string) => {
  try {
    const quizRef = doc(db, "quiz", quizId);
    const docSnap = await getDoc(quizRef);
    if (docSnap.exists()) {
      return docSnap.data() as QuizSpanSliceStateType;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error loading quiz data:", error);
  }
};

// Function to delete quiz data from Firestore with toast notification
export const deleteQuizData = async (quizId: string) => {
  return toast.promise(
    async () => {
      const quizRef = doc(db, "quiz", quizId);
      await deleteDoc(quizRef);
    },
    {
      pending: "Deleting quiz...",
      success: "Quiz deleted successfully!",
      error: "Error deleting quiz",
    },
  );
};

// Function to edit quiz data in Firestore with toast notification
export const editQuizData = async (
  quizId: string,
  updatedData: Partial<QuizSpanSliceStateType>,
) => {
  return toast.promise(
    async () => {
      const quizRef = doc(db, "quiz", quizId);
      await updateDoc(quizRef, updatedData);
    },
    {
      pending: "Updating quiz data...",
      success: "Quiz data saved successfully!",
      error: "Error updating quiz data",
    },
  );
};

// Function to save user responses in Firestore
export const saveUserResponse = async (
  quizId: string,
  userId: string,
  userResponses: UserResponseType[],
) => {
  return toast.promise(
    async () => {
      const quizRef = doc(db, "quiz", quizId);

      const responseObject = {
        userId,
        responses: userResponses,
        timestamp: format(new Date(), "dd MMM yyyy"),
      };

      const docSnap = await getDoc(quizRef);

      if (docSnap.exists()) {
        await updateDoc(quizRef, {
          userResponses: arrayUnion(responseObject),
        });
      } else {
        await setDoc(quizRef, {
          userResponses: [responseObject],
        });
      }
    },
    {
      pending: "Saving quiz responses...",
      success: "Quiz responses saved successfully!",
      error: "Error saving quiz responses",
    },
  );
};
