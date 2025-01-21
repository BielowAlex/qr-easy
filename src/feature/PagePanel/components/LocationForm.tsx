'use client';
import { countryList } from '@/constants';
import { PagePanelFormHeader, usePagePanelStore } from '@/feature';
import { api } from '@/lib';
import { checkIsUrlValid } from '@/lib/utils/checkIsUrlValid.util';
import { ILocation } from '@/types';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import React, { ChangeEvent } from 'react';

const LocationForm: React.FC = () => {
  const { setDraftData, draftData, saveDraftChange } = usePagePanelStore();

  const location: ILocation | undefined | null = draftData?.location;
  const isGoogleUrlInvalid =
    draftData?.location?.googleUrl &&
    draftData?.location?.googleUrl?.length > 0 &&
    !checkIsUrlValid(draftData?.location?.googleUrl);
  const { mutateAsync: updateLocationById } =
    api.location.updateById.useMutation();

  if (!draftData) return null;

  const handleSaveLocation = () => {
    if (!location || isGoogleUrlInvalid) return;

    updateLocationById({ id: location.id, changes: location })
      .then(() => {
        saveDraftChange();
      })
      .catch((e) => console.log('updateLocationById error: ', e));
  };

  const handleCountryChange = (event: SelectChangeEvent) => {
    if (!draftData?.location) return;

    setDraftData({
      ...draftData,
      location: {
        ...draftData.location,
        country: event.target.value as string,
      },
    });
  };

  const handleGoogleUrlChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (!draftData?.location) return;

    const googleUrl: string = event.currentTarget.value.trim();

    setDraftData({
      ...draftData,
      location: {
        ...draftData.location,
        googleUrl: googleUrl.length === 0 ? null : googleUrl,
      },
    });
  };

  const handleCityChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(draftData?.location);
    if (!draftData?.location) return;

    const city: string = event.currentTarget.value.trim();

    setDraftData({
      ...draftData,
      location: {
        ...draftData.location,
        city: city.length === 0 ? null : city,
      },
    });
  };

  const handleAddressChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (!draftData?.location) return;

    const address: string = event.currentTarget.value.trim();

    setDraftData({
      ...draftData,
      location: {
        ...draftData.location,
        address: address.length === 0 ? null : address,
      },
    });
  };

  return (
    <Stack>
      <PagePanelFormHeader
        title={'Location'}
        description={
          'Here you can add your brands address by specifying the country, city, and street. This will help others find you more easily.'
        }
        onSave={handleSaveLocation}
      />

      <Stack flex={1} spacing={2} padding={10}>
        <TextField
          label="Address"
          value={draftData?.location?.address}
          slotProps={{
            htmlInput: { maxLength: 32 },
          }}
          onChange={handleAddressChange}
        />
        <TextField
          label="City"
          value={draftData?.location?.city}
          slotProps={{
            htmlInput: { maxLength: 32 },
          }}
          onChange={handleCityChange}
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            value={location?.country}
            onChange={handleCountryChange}
            label={'Country'}
          >
            {countryList &&
              countryList.map((el, index) => (
                <MenuItem key={`${Date.now()}-${index}`} value={el}>
                  {el}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          label="Google maps url"
          value={draftData?.location?.googleUrl || ''}
          error={!!isGoogleUrlInvalid}
          onChange={handleGoogleUrlChange}
        />
      </Stack>
    </Stack>
  );
};

export { LocationForm };
