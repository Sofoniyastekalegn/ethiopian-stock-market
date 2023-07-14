import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/common/layout/main-layout";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element="Hello"></Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
