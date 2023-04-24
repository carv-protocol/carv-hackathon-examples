import { Box, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { uploadFile } from './uploadFile';
import { S3_HOST } from 'src/constants';
import { useState } from 'react';

const UploadText = () => {
  const [textUrlList, setTextUrlList] = useState<string[]>([]);

  const onTextSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const file = selectedFiles[0];

      const item = await uploadFile(file, 'highlights_dev');
      const textUrl = S3_HOST + '/' + item;

      setTextUrlList([...textUrlList, textUrl]);
    }
  };

  return (
    <Stack sx={{ mt: 5 }} alignSelf={'flex-start'}>
      <Stack
        flexDirection={'row'}
        alignItems={'center'}
        gap={3}
        flexWrap={'wrap'}
      >
        <Typography variant="subtitle1">upload text: </Typography>
        <Stack>
          {textUrlList.map((textUrl, i) =>
            textUrl ? (
              <Typography variant="body1" key={textUrl}>
                {textUrl}
              </Typography>
            ) : (
              'loading...'
            )
          )}
        </Stack>
        <Box
          className="relative flex-row-cc cursor-pointer"
          sx={{
            bgcolor: 'neutral.800',
            border: theme => `1px dashed ${theme.palette.grey[500]}`,
            cursor: 'pointer',
            height: 48,
            width: 48,
          }}
        >
          <AddIcon className="cursor-pointer" />
          <input
            type="file"
            accept="text/*"
            className="w-full h-full absolute left-0 top-0 cursor-pointer opacity-0"
            onChange={onTextSelect}
          ></input>
        </Box>
      </Stack>
    </Stack>
  );
};

export default UploadText;
