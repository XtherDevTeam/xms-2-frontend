import React from 'react';
import Editor from '@monaco-editor/react';

const ContentEditor = ({ height, width, mode, language, value, onChange, options }) => {
  return (
    <Editor
      height={height}
      width={width}
      theme={mode === "dark" ? "vs-dark" : "light"}
      language={language}
      value={value}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        wordWrap: "on",
        fontSize: 14,
        ...options
      }}
    />
  );
};

export default ContentEditor;
