import React, {Component} from "react"
import {API, graphqlOperation} from "aws-amplify";
import {createPost} from "../graphql/mutations";

export default class CreatePost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postOwnerId: "",
      postOwnerUsername: "",
      postTitle: "",
      postBody: "",
    }
  }

  async componentDidMount() {

  }

  handleChangePost = (event) => {
    this.setState((satae) => {
      return {
        [event.target.name]: event.target.value
      }
    })
  }

  handlePost = async (event) => {
    event.preventDefault()
    const state = this.state
    const input = {
      postOwnerId: "abc123",
      postOwnerUsername: "HardCoded",
      postTitle: state.postTitle,
      postBody: state.postBody,
      createdAt: new Date().toISOString()
    }

    await API.graphql(graphqlOperation(createPost, { input }))

    this.setState((prevState) => ({
      postTitle: "",
      postBody: "",
    }))
  }

  render() {
    return (
      <form className={"add-post"} onSubmit={this.handlePost}>
        <input
          type={"text"}
          style={{ fontSize: 19 }}
          name={"postTitle"}
          required
          placeholder={"Post Title"}
          value={this.state.postTitle}
          onChange={this.handleChangePost}
        />
        <textarea
          name={"postBody"}
          rows={3}
          cols={40}
          required
          placeholder={"New Blog Post"}
          value={this.state.postBody}
          onChange={this.handleChangePost}
        />
        <input
          type={"submit"}
          className={"btn"}
          style={{ fontSize: 19 }}
        />
      </form>
    )
  }
}