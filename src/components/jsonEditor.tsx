// components/JsonEditor.js
"use client";
import React, { useState } from 'react';
import CodeEditor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-okaidia.css';

const JsonEditor = () => {
  const [code, setCode] = useState(JSON.stringify({
    name: "Sikander Mukhtar",
    username: "sikandermukhtar",
    email: "sikandarmukhtar5@gmail.com",
    bio: "Software Engineer | Tech Fanatic",
    location: {
      city: "Lahore",
      country: "Pakistan"
    },
    education: [
      {
        institution: "COMSATS University, Lahore Campus",
        degree: "Bachelor of Science in Computer Science",
        start_date: "2022-09-11",
        end_date: "2026-06-31"
      }
    ]
  }, null, 2));

  return (
    <div className="relative border border-gray-300 resize overflow-auto min-w-fit max-w-3xl max-h-[520px] min-h-[430px] ">
      <div className="absolute top-0 left-0 bottom-0 w-10 bg-gray-100 border-r border-gray-300 flex flex-col items-center">
        {code.split('\n').map((_, index) => (
          <div key={index} className="text-gray-500 text-sm">{index + 1}</div>
        ))}
      </div>
      <CodeEditor
        value={code}
        onValueChange={setCode}
        highlight={(code) => Prism.highlight(code, Prism.languages.json, 'json')}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 18,
          paddingLeft: 10, // Adjust padding to match line numbers
        }}
        className="w-full h-full bg-black text-white"
      />
    </div>
  );
};

export default JsonEditor;