import React from 'react';
import './App.css';

import {QueryClient, QueryClientProvider} from 'react-query';
import Table from './Components/Table/Table';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Table />
      </div>
    </QueryClientProvider>
  );
}

export default App;
