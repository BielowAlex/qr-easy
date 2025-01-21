'use client';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const DescriptionForm: React.FC = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const [value, setValue] = useState('');

  const handleSave = () => {
    // onSave(value);
  };

  return (
    <Stack>
      <ReactQuill
        value={value}
        onChange={setValue}
        theme={'snow'}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
          ],
        }}
        formats={[
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'link',
          'image',
          'list',
        ]}
        placeholder="Start typing..."
      />
      <Button
        variant={'contained'}
        onClick={handleSave}
        style={{ marginTop: '10px' }}
      >
        Save
      </Button>
    </Stack>
  );
};

export { DescriptionForm };
