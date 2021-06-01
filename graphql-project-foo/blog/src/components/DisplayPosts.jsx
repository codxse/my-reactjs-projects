import React, { Component } from "react"
import {listPosts} from "../graphql/queries";
import {API, graphqlOperation} from "aws-amplify";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

class DisplayPosts extends Component {

  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  async componentDidMount() {
    await this.getPosts()
  }

  async getPosts() {
    const result = await API.graphql(graphqlOperation(listPosts))
    this.setState((prevState) => ({
      ...prevState,
      posts: result.data.listPosts.items
    }))
  }

  render() {
    const posts = this.state.posts
    return (
      <div>
        {posts.map((post) => {
          return (
            <div key={post.id} className={"posts"} style={rowStyle}>
              <h1>{post.postTitle}</h1>
              <span>
                {"Wrote by: "} {post.postOwnerUsername} {" "}
                {"On: "} <time style={{fontStyle: "italic"}}>{new Date(post.createdAt).toDateString()}</time>
              </span>
              <p>{post.postBody}</p>
              <br/>
              <span>
                <DeletePost/>
                <EditPost/>
              </span>
            </div>
          )
        })}
      </div>

    )
  }
}

export default DisplayPosts

const rowStyle = {
  background: "#f4f4f4",
  padding: 10,
  border: "1px #ccc dotted",
  margin: 14
}