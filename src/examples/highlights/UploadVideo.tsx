import { Box, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { uploadFile } from './uploadFile';
import { S3_HOST } from 'src/constants';
import { useState } from 'react';

const UploadVideo = () => {
  const [videoUrlList, setVideoUrlList] = useState<string[]>([]);

  const onVideoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const file = selectedFiles[0];

      if (file.size > 31457280) {
        toast.warning(
          `Video ${file.name} exceeds the maximum upload limit of 30MB.`
        );
      } else {
        const item = await uploadFile(file, 'highlights_dev');
        const videoUrl = S3_HOST + '/' + item;

        setVideoUrlList([...videoUrlList, videoUrl]);
      }
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
        <Typography variant="subtitle1">upload video: </Typography>
        {videoUrlList.map((videoUrl, i) =>
          videoUrl ? (
            <video width="300" height="180" controls>
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            'loading...'
          )
        )}
        <Box
          className="relative flex-row-cc cursor-pointer"
          sx={{
            bgcolor: 'neutral.800',
            border: theme => `1px dashed ${theme.palette.grey[500]}`,
            cursor: 'pointer',
            height: 180,
            width: 300,
          }}
        >
          <AddIcon className="cursor-pointer" />
          <input
            type="file"
            accept="video/*"
            // multiple
            className="w-full h-full absolute left-0 top-0 cursor-pointer opacity-0"
            onChange={onVideoSelect}
          ></input>
        </Box>
      </Stack>
    </Stack>
  );
};

export default UploadVideo;
