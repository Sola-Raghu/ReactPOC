import React, { useState } from 'react';
import axios from 'axios';

axios.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});
axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const AxiosDemo: React.FC = () => {
  const [getResult, setGetResult] = useState<any>(null);
  const [postResult, setPostResult] = useState<any>(null);
  const [putResult, setPutResult] = useState<any>(null);
  const [patchResult, setPatchResult] = useState<any>(null);
  const [deleteResult, setDeleteResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [postData, setPostData] = useState({ title: '', body: '', userId: 1 });
  const [putData, setPutData] = useState({ id: '', title: '', body: '', userId: 1 });
  const [patchData, setPatchData] = useState({ id: '', title: '' });
  const [deleteId, setDeleteId] = useState('');

  // GET
  const handleGet = async () => {
    setLoading(true); setError(null);
    try {
      const res = await axios.get(API_URL);
      setGetResult(res.data.slice(0, 5));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // POST
  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null);
    try {
      const res = await axios.post(API_URL, postData);
      setPostResult(res.data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // PUT
  const handlePut = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null);
    try {
      const res = await axios.put(`${API_URL}/${putData.id}`, {
        title: putData.title,
        body: putData.body,
        userId: putData.userId,
      });
      setPutResult(res.data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // PATCH
  const handlePatch = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null);
    try {
      const res = await axios.patch(`${API_URL}/${patchData.id}`, {
        title: patchData.title,
      });
      setPatchResult(res.data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null);
    try {
      const res = await axios.delete(`${API_URL}/${deleteId}`);
      setDeleteResult(res.status === 200 ? `Deleted post ${deleteId}` : 'Delete failed');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h2>JSONPlaceholder API Demo (Axios)</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <div>Loading...</div>}

      <section style={{ marginBottom: 24 }}>
        <h3>GET Posts</h3>
        <button onClick={handleGet}>Fetch Posts</button>
        {getResult && (
          <pre style={{ background: '#f4f4f4', padding: 10, maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(getResult, null, 2)}</pre>
        )}
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3>POST a New Post</h3>
        <form onSubmit={handlePost} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input
            type="text"
            placeholder="Title"
            value={postData.title}
            onChange={e => setPostData({ ...postData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Body"
            value={postData.body}
            onChange={e => setPostData({ ...postData, body: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="User ID"
            value={postData.userId}
            onChange={e => setPostData({ ...postData, userId: Number(e.target.value) })}
            required
          />
          <button type="submit">Create Post</button>
        </form>
        {postResult && (
          <pre style={{ background: '#f4f4f4', padding: 10, maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(postResult, null, 2)}</pre>
        )}
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3>PUT (Replace) a Post</h3>
        <form onSubmit={handlePut} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input
            type="number"
            placeholder="Post ID"
            value={putData.id}
            onChange={e => setPutData({ ...putData, id: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Title"
            value={putData.title}
            onChange={e => setPutData({ ...putData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Body"
            value={putData.body}
            onChange={e => setPutData({ ...putData, body: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="User ID"
            value={putData.userId}
            onChange={e => setPutData({ ...putData, userId: Number(e.target.value) })}
            required
          />
          <button type="submit">Replace Post</button>
        </form>
        {putResult && (
          <pre style={{ background: '#f4f4f4', padding: 10, maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(putResult, null, 2)}</pre>
        )}
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3>PATCH (Edit Title) of a Post</h3>
        <form onSubmit={handlePatch} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input
            type="number"
            placeholder="Post ID"
            value={patchData.id}
            onChange={e => setPatchData({ ...patchData, id: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="New Title"
            value={patchData.title}
            onChange={e => setPatchData({ ...patchData, title: e.target.value })}
            required
          />
          <button type="submit">Edit Title</button>
        </form>
        {patchResult && (
          <pre style={{ background: '#f4f4f4', padding: 10, maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(patchResult, null, 2)}</pre>
        )}
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3>DELETE a Post</h3>
        <form onSubmit={handleDelete} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input
            type="number"
            placeholder="Post ID"
            value={deleteId}
            onChange={e => setDeleteId(e.target.value)}
            required
          />
          <button type="submit">Delete Post</button>
        </form>
        {deleteResult && (
          <pre style={{ background: '#f4f4f4', padding: 10, maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(deleteResult, null, 2)}</pre>
        )}
      </section>
    </div>
  );
};

export default AxiosDemo;
