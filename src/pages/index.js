import { useState, useEffect } from "react";

async function fetchPost() {
  // fetch from the database the post

  return {
    title: "My Post",
    content: "My post content",
    authorId: 1,
  };
}

async function fetchAuthor(id) {
  // fetch from my database the author 
  // Use the id that we passed in from the previous query

  return {
    name: "John Doe",
  };
}

export default function Home() {
  const [loadingPost, setLoadingPost] = useState(true);
  const [postError, setPostError] = useState(null);
  const [post, setPost] = useState(null);
  const [loadingAuthor, setLoadingAuthor] = useState(true);
  const [author, setAuthor] = useState(null);
  const [authorError, setAuthorError] = useState(null);

  useEffect(() => {
  (async () => {
      try{
      const post = await fetchPost();
      setPost(post);
      } catch (error) {
      setPostError(error);
      } finally {
      setLoadingPost(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async ()=> {
      try{
      if(!post) return;

      const author = await fetchAuthor(post.authorId);
      setAuthor(author);
      } catch (error) {
      setAuthorError(error);
      } finally {
      setLoadingAuthor(false);
      }
    });
  }, [post]);
  return <>

    {/* Post */}
    {post?.title}

    {/*Author*/}
    {author?.name}
  </>;
}
 