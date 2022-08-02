import { collection } from 'firebase/firestore'
import { db } from './init-firebase'

export const projectCollectionRef = collection(db, "ido_projects")