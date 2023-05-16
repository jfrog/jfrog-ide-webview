import { createContext } from 'react'
import { EventManager } from '../api/eventManager'

export const eventManagerContext = createContext<EventManager>({} as EventManager)
