'use client';
import { ModalHeader } from '@/components';
import { api } from '@/lib';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React, { ChangeEvent, useState } from 'react';

const ModalContainer = styled(Modal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100dvh',
  zIndex: 1000,
});
const Container = styled(Stack)(({ theme }) => ({
  position: 'relative',
  background: theme.palette.background.paper,
  padding: 24,
  borderRadius: 12,
  gap: 32,
  width: '100%',
  maxWidth: 400,
}));

interface Props {
  refetch: () => void;
  handleCancel: () => void;
  isModalOpen: boolean;
}

const CreatePageModal: React.FC<Props> = ({
  isModalOpen,
  handleCancel,
  refetch,
}) => {
  // form inputs
  const [inputName, setInputName] = useState<string>('');
  const [inputDescription, setInputDescription] = useState<string>('');
  const [inputCurrency, setInputCurrency] = useState<string>('');
  const [currentLanguage, setCurrentLanguage] = useState<string>('');

  const isDisabled: boolean =
    inputName.trim().length === 0 ||
    inputDescription.trim().length === 0 ||
    inputCurrency.trim().length === 0 ||
    currentLanguage.length === 0;

  const { mutateAsync: createPage } = api.pages.create.useMutation();
  const { data: languageList } = api.language.getAll.useQuery();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setCurrentLanguage(event.target.value as string);
  };

  const handleCurrencyChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value.trim().length > 3) return;

    setInputCurrency(e.target.value.trim().toUpperCase());
  };

  const handleModalClose = () => {
    setInputCurrency('');
    setInputName('');
    setInputDescription('');
    setCurrentLanguage('');
    handleCancel();
  };

  const handleCreatePage = async () => {
    try {
      const input = {
        currency: inputCurrency,
        langCode: currentLanguage,
        name: inputName,
        description: inputDescription,
      };

      await createPage(input);

      refetch();

      handleModalClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ModalContainer open={isModalOpen}>
        <Container>
          <Stack width={'100%'} gap={24}>
            <ModalHeader
              handleCancel={handleModalClose}
              icon={<AutoStoriesRoundedIcon />}
            />
            <Stack gap={4}>
              <Typography variant={'h3'}>Create Page form</Typography>
            </Stack>
            <FormControl defaultValue={inputName} required>
              <Typography>Brand name *</Typography>
              <Input
                placeholder="McDonalds"
                value={inputName}
                error={inputName.length < 2}
                onChange={(e) => setInputName(e.currentTarget.value)}
              />
            </FormControl>
            <FormControl defaultValue={inputDescription} required>
              <Typography>Description * </Typography>
              <Input
                placeholder="Best burgers in the world"
                value={inputDescription}
                onChange={(e) => setInputDescription(e.currentTarget.value)}
              />
            </FormControl>
            <FormControl defaultValue={inputCurrency} required>
              <Typography>Currency * </Typography>
              <Input
                placeholder="USD"
                value={inputCurrency}
                onChange={handleCurrencyChange}
              />
            </FormControl>
            <FormControl variant="standard" fullWidth required>
              <InputLabel id="demo-simple-select-standard-label">
                Language
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                value={currentLanguage}
                onChange={handleLanguageChange}
                label={'Language'}
              >
                {languageList &&
                  languageList.map((el) => (
                    <MenuItem key={el.id} value={el.code}>
                      {el.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              width={'100%'}
            >
              <Button
                variant={'outlined'}
                sx={{ maxWidth: 160 }}
                onClick={handleModalClose}
              >
                <Typography fontWeight={600} fontSize={14}>
                  Cancel
                </Typography>
              </Button>
              <Button
                variant={'contained'}
                sx={{ maxWidth: 160 }}
                disabled={isDisabled}
                onClick={handleCreatePage}
              >
                <Typography fontWeight={600} fontSize={14}>
                  Create Page
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Container>
      </ModalContainer>
    </>
  );
};

export { CreatePageModal };
