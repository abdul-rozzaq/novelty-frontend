"use client"
import { PostType } from '@/interface';
import React, { useEffect, useState } from 'react';



async function getPosts(): Promise<PostType[]> {
    const res = await fetch('http://webnovelty.pythonanywhere.com/api/get-books/', {
        next: {
            revalidate: 30
        }
    });
    
    return res.json();
  }
  


const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); 

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
            {post.id} 
            |
          {post.name}
          
        </div>
      ))}
    </>
  );
};

export default PostsList;
