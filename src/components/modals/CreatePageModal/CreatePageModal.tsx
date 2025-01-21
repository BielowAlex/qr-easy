'use client';
import { ModalHeader } from '@/components';
import { api } from '@/lib';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React, { ChangeEvent, useState } from 'react';

const ModalContainer = styled(Modal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100dvh',
  maxHeight: '100dvh',
  zIndex: 1000,
});

const StyledInputLabel = styled(InputLabel)({
  left: -14,
  top: 10,
});
const StyledInput = styled(Input)({
  fontSize: 14,
  ':before': {
    borderBottomStyle: 'solid !important',
    borderBottomColor: '1px solid pink',
  },
});

const Container = styled(Stack)(({ theme }) => ({
  position: 'relative',
  background: theme.palette.background.paper,
  padding: 24,
  borderRadius: 12,
  gap: 32,
  width: '100%',
  maxWidth: 400,
  height: '100%',
  maxHeight: '95dvh',
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
  const [inputBrandName, setInputBrandName] = useState<string>('');
  const [inputName, setInputName] = useState<string>('');
  const [inputBrandDescription, setInputBrandDescription] =
    useState<string>('');
  const [inputDescription, setInputDescription] = useState<string>('');
  const [inputCurrency, setInputCurrency] = useState<string>('');
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [currentCountry, setCurrentCountry] = useState<string>('');

  const isFormDisabled: boolean =
    inputName.trim().length === 0 ||
    inputBrandName.trim().length === 0 ||
    inputBrandDescription.trim().length === 0 ||
    inputDescription.trim().length === 0 ||
    inputCurrency.trim().length < 3 ||
    currentLanguage.length === 0;

  const { palette } = useTheme();

  const { mutateAsync: createPage } = api.pages.create.useMutation();
  const { data: languageList } = api.language.getAll.useQuery();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setCurrentLanguage(event.target.value as string);
  };

  const handleCountryChange = (event: SelectChangeEvent) => {
    setCurrentCountry(event.target.value as string);
  };

  const handleCurrencyChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const isLetter: RegExp = /^[A-Za-z]+$/;
    const currentValue: string = e.target.value.trim();

    if (currentValue.length > 3) return;
    if (!isLetter.test(currentValue) && currentValue.length !== 0) return;

    setInputCurrency(currentValue.toUpperCase());
  };

  const handleModalClose = () => {
    setInputCurrency('');
    setInputName('');
    setInputDescription('');
    setCurrentLanguage('en');
    setInputCurrency('');
    setInputBrandName('');
    setInputBrandDescription('');
    setCurrentCountry('');

    handleCancel();
  };

  const handleCreatePage = async () => {
    try {
      const input = {
        currency: inputCurrency,
        langCode: currentLanguage,
        name: inputName,
        description: inputDescription,
        brandName: inputBrandName,
        brandDescription: inputBrandDescription,
        country: currentCountry ? currentCountry : undefined,
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
          <Stack
            width={'100%'}
            height={'100%'}
            gap={24}
            justifyContent={'space-between'}
          >
            <Stack gap={24}>
              <ModalHeader
                handleCancel={handleModalClose}
                icon={<AutoStoriesRoundedIcon />}
              />
              <Stack gap={4}>
                <Typography variant={'h3'}>Create Page form</Typography>
                <Typography variant={'subtitle2'} color={palette.grey['500']}>
                  To create a page, you need to fill in all the basic
                  information required for its creation. After that, you will be
                  able to edit and add additional details about your brand using
                  Page Panel.
                </Typography>
              </Stack>
            </Stack>
            <Stack
              gap={18}
              height={'fit-content'}
              sx={{
                paddingRight: '10px',
                scrollbarWidth: 'thin',
              }}
              overflow={'auto'}
            >
              <FormControl defaultValue={inputBrandName} required>
                <StyledInputLabel shrink>
                  Brand name (Latin letters only)
                </StyledInputLabel>
                <StyledInput
                  placeholder="McDonalds"
                  endAdornment={
                    <Tooltip
                      title={
                        "This is a unique name for your brand that will be used by the system. Specifically, it will appear in the link to your brand's page and as the title of the browser tab."
                      }
                    >
                      <HelpOutlineRoundedIcon
                        fontSize={'small'}
                        sx={{ color: palette.grey[300], cursor: 'help' }}
                      />
                    </Tooltip>
                  }
                  value={inputBrandName}
                  error={inputBrandName.trim().length < 2}
                  onChange={(e) => setInputBrandName(e.currentTarget.value)}
                />
              </FormControl>
              <FormControl defaultValue={inputBrandDescription} required>
                <StyledInputLabel htmlFor="description" shrink>
                  Brand description (Latin letters only)
                </StyledInputLabel>
                <StyledInput
                  multiline
                  maxRows={7}
                  placeholder={'Best burgers in the world'}
                  value={inputBrandDescription}
                  error={inputBrandDescription.trim().length < 11}
                  onChange={(e) =>
                    setInputBrandDescription(e.currentTarget.value)
                  }
                />
              </FormControl>

              <FormControl variant="standard" fullWidth required>
                <StyledInputLabel
                  sx={{ left: 0 }}
                  id="demo-simple-select-standard-label"
                  shrink
                >
                  Default Language
                </StyledInputLabel>
                <Select
                  value={currentLanguage}
                  onChange={handleLanguageChange}
                  label={'Language'}
                  error={currentLanguage.length === 0}
                  sx={{ paddingTop: 10, fontSize: 14 }}
                >
                  {languageList &&
                    languageList.map((el) => (
                      <MenuItem key={el.id} value={el.code}>
                        {el.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl
                disabled={!currentLanguage}
                defaultValue={inputCurrency}
                required
              >
                <StyledInputLabel shrink>Name</StyledInputLabel>
                <StyledInput
                  placeholder="McDonalds"
                  value={inputName}
                  error={inputName.trim().length < 2}
                  onChange={(e) => setInputName(e.currentTarget.value)}
                />
              </FormControl>
              <FormControl
                defaultValue={inputDescription}
                required
                disabled={!currentLanguage}
              >
                <StyledInputLabel shrink>Description</StyledInputLabel>
                <StyledInput
                  multiline
                  maxRows={7}
                  placeholder={'Best burgers in the world'}
                  disabled={!currentLanguage}
                  value={inputDescription}
                  error={inputDescription.trim().length < 11}
                  onChange={(e) => setInputDescription(e.currentTarget.value)}
                />
              </FormControl>
              <FormControl
                disabled={!currentLanguage}
                defaultValue={inputCurrency}
                required
              >
                <StyledInputLabel shrink>Currency</StyledInputLabel>
                <StyledInput
                  placeholder="USD"
                  value={inputCurrency}
                  onChange={handleCurrencyChange}
                  error={inputCurrency.trim().length < 3}
                />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <StyledInputLabel sx={{ left: 0 }} shrink>
                  Country
                </StyledInputLabel>
                <Select
                  value={currentCountry}
                  onChange={handleCountryChange}
                  label={'Country'}
                  sx={{ paddingTop: 10, fontSize: 14 }}
                >
                  {languageList &&
                    languageList.map((el, index) => (
                      <MenuItem key={`${el.id}-${index}`} value={el.name}>
                        {el.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Stack>

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
                disabled={isFormDisabled}
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
