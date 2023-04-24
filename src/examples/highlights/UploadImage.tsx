import { Box, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { readFile } from 'src/utils/file';
import { uploadFile } from './uploadFile';
import { S3_HOST } from 'src/constants';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const UploadImage = () => {
  const [imageUrlList, setImageUrlList] = useState<string[]>([]);

  console.log('imageUrlList:', imageUrlList);
  const imageSelectOnChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const file = selectedFiles[0];

      if (file.size > 3145728) {
        toast.warning(
          `Image ${file.name} exceeds the maximum upload limit of 3MB.`
        );
      } else {
        const item = await uploadFile(file, 'highlights_dev');
        const imageUrl = S3_HOST + '/' + item;

        setImageUrlList([...imageUrlList, imageUrl]);
      }
    }
  };
  return (
    <Stack sx={{ mt: 5 }} alignSelf={'flex-start'}>
      <Stack flexDirection={'row'} alignItems={'center'} gap={3}>
        <Typography variant="subtitle1">upload image: </Typography>

        {imageUrlList.map((imageUrl, i) =>
          imageUrl ? (
            <Box
              key={i}
              className="relative"
              sx={{
                width: 200,
                height: 112,
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                '&:hover .icon-close_button': {
                  display: 'block',
                },
              }}
            >
              <CloseIcon
                className="flex-row-cc icon-close_button absolute right-0 top-0 hidden cursor-pointer"
                sx={{
                  width: 16,
                  height: 16,
                  color: 'neutral.200',
                }}
                onClick={e => {
                  e.stopPropagation();
                  const list = [...imageUrlList];
                  list.splice(i, 1);
                  setImageUrlList(list);
                }}
              />
            </Box>
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
            height: 112,
            width: 200,
          }}
        >
          <AddIcon className="cursor-pointer" />
          <input
            type="file"
            accept="image/*"
            // multiple
            className="w-full h-full absolute left-0 top-0 cursor-pointer opacity-0"
            onChange={imageSelectOnChange}
          ></input>
        </Box>
      </Stack>
    </Stack>
  );
};

export default UploadImage;
