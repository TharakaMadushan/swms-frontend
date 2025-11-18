import React, { useState } from 'react';
import axios from 'axios';

/**
 * Backend Connection Test Component
 * 
 * Add this temporarily to your app to test backend connectivity
 * Usage: Import and add <BackendConnectionTest /> to your login page
 */
export const BackendConnectionTest: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async (url: string, protocol: 'http' | 'https') => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      const fullUrl = `${protocol}://localhost:7001${url}`;
      console.log('Testing:', fullUrl);
      
      const response = await axios.get(fullUrl, {
        timeout: 5000,
        validateStatus: () => true, // Don't throw on any status
      });
      
      setResult(`✅ SUCCESS!\nURL: ${fullUrl}\nStatus: ${response.status}\nBackend is reachable!`);
      console.log('Response:', response);
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED' || error.message.includes('ERR_CONNECTION_REFUSED')) {
        setResult(`❌ CONNECTION REFUSED\nURL: ${protocol}://localhost:7001${url}\n\n⚠️ Backend is NOT running!\n\nStart your backend with:\ncd path/to/backend\ndotnet run`);
      } else if (error.code === 'ETIMEDOUT') {
        setResult(`❌ TIMEOUT\nBackend took too long to respond`);
      } else if (error.message.includes('ERR_CERT_AUTHORITY_INVALID')) {
        setResult(`⚠️ SSL CERTIFICATE ERROR\n\nThe HTTPS certificate is not trusted.\n\nFix:\n1. Run: dotnet dev-certs https --trust\n2. Or use HTTP instead of HTTPS`);
      } else {
        setResult(`❌ ERROR: ${error.message}\n\nDetails: ${JSON.stringify(error, null, 2)}`);
      }
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testLoginEndpoint = async () => {
    setLoading(true);
    setResult('Testing login endpoint...');
    
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7001';
      const url = `${baseURL}/api/auth/login`;
      
      console.log('Testing login at:', url);
      
      const response = await axios.post(
        url,
        { email: 'admin@swms.com', password: 'Admin@123' },
        {
          timeout: 5000,
          validateStatus: () => true,
        }
      );
      
      setResult(`✅ LOGIN ENDPOINT REACHED!\nURL: ${url}\nStatus: ${response.status}\n\nResponse: ${JSON.stringify(response.data, null, 2)}`);
      console.log('Login response:', response);
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED' || error.message.includes('ERR_CONNECTION_REFUSED')) {
        setResult(`❌ CONNECTION REFUSED\nCannot reach backend at login endpoint\n\n⚠️ Backend is NOT running!`);
      } else {
        setResult(`Error: ${error.message}`);
      }
      console.error('Login test error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#1e293b',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
      zIndex: 9999,
      maxWidth: '500px',
      fontFamily: 'monospace',
      fontSize: '12px',
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#fbbf24' }}>🔧 Backend Connection Test</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Config:</strong>
        <div style={{ background: '#0f172a', padding: '8px', borderRadius: '4px', marginTop: '5px' }}>
          VITE_API_BASE_URL: {import.meta.env.VITE_API_BASE_URL || '(not set)'}
          <br />
          Fallback: https://localhost:7001
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
        <button
          onClick={() => testConnection('/swagger', 'https')}
          disabled={loading}
          style={{
            padding: '8px 12px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          Test HTTPS Swagger
        </button>
        
        <button
          onClick={() => testConnection('/swagger', 'http')}
          disabled={loading}
          style={{
            padding: '8px 12px',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          Test HTTP Swagger
        </button>
        
        <button
          onClick={testLoginEndpoint}
          disabled={loading}
          style={{
            padding: '8px 12px',
            background: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          Test Login Endpoint
        </button>
      </div>

      {result && (
        <pre style={{
          background: '#0f172a',
          padding: '12px',
          borderRadius: '4px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          maxHeight: '300px',
          overflow: 'auto',
          margin: 0,
        }}>
          {result}
        </pre>
      )}
    </div>
  );
};