import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostTable = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Second Page</h1>
      <DataGrid
        rows={posts}
        columns={columns}
        rowsPerPageOptions={[5]}
        {...(null as any)} // Explicitly cast to any to avoid type checking issue
      />
    </div>
  );
};

export default PostTable;
