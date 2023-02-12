export const chatReducer = (state: TMessage[] = [], action: TActions): TMessage[] => {
  switch (action.type) {
    case 'SET-MESSAGE': {
      return [...state, ...action.messages]
    }
    case "RESET-MESSAGE": {
      return []
    }
    default: return state
  }

}

export const setMessages = (messages: TMessage[]) => ({type: 'SET-MESSAGE', messages} as const)
export const resetMessages = () => ({type: 'RESET-MESSAGE'} as const)

// types
type TActions =
  | ReturnType<typeof setMessages>
  | ReturnType<typeof resetMessages>

export type TMessage = {
  userId: string
  userName: string
  message: string
  photo: string
}
