import React from 'react'
import { ERROR_MSG, Mid } from '@mid/sdk'

export interface LoadingProps {
  onLogin: () => void
  isLoading: boolean
  errorMsg?: string
}

interface Props {
  mid: Mid
  loadingNode: (props: LoadingProps) => React.ReactNode
}

interface State {
  mid: Mid
  isAuthed: boolean
  isLoading: boolean
}

export default class LoginWrapper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      mid: props.mid,
      isAuthed: false,
      isLoading: true,
    }

    this.checkIsAuth()
  }

  checkIsAuth() {
    this.state.mid.isAuthed().then((isAuthed: any) => {
      this.setState({ isAuthed, isLoading: false })
    })
  }

  login() {
    this.setState({ isLoading: true })
    this.state.mid.login().finally(() => {
      this.checkIsAuth()
    })
  }

  onLogin = () => {
    this.login()
  }

  render() {
    const errorMsg = this.state.mid.core.state.get(ERROR_MSG)

    return this.state.isAuthed
      ? this.props.children
      : this.props.loadingNode({ onLogin: this.onLogin, isLoading: this.state.isLoading, errorMsg })
  }
}