export interface InitState {
  errorMssage: null | string
  status: string
  authToken: string
  date: Date
}

export interface ConversationsRecords {
  id: number
  user_id: number
  label: string
  created_at: Date
}

export interface ConversationMessages {
  id: number
  conversation_id: number
  content: string
  user_id: null | number
  created_at: Date
  status?: string
}
