import { useState } from "react";
import InputWithButton from "./InputWithButton";
import { MapPin } from "lucide-react";
import { useGeoLocation } from "@/features/projects/hooks/useGeoLocation";
import { Spinner } from "./ui/spinner";
import { useDebounce } from "use-debounce";
import { useSearchLocation } from "@/features/projects/hooks/useForwardGeolocation";

function LocationInput({
  onLocation,
  field,
}: {
  onLocation: (data: any) => any;
  field: any;
}) {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 100);
  const { getPosition, isPending: isLoadingLocation } = useGeoLocation();

  const { isSearchingLocation, refetchLocations, locations } =
    useSearchLocation(debouncedValue);

  function handleGetLocation(e) {
    e.preventDefault();
    getPosition(
      {},
      {
        onSuccess: (data) => {
          setValue(data.address);
          onLocation(data);
        },
      }
    );
  }

  function handleOnChange(e) {
    setValue(e.target.value);
  }

  return (
    <InputWithButton
      {...field}
      icon={isLoadingLocation ? <Spinner /> : <MapPin />}
      value={value}
      onChange={handleOnChange}
      disabled={isLoadingLocation}
      onClick={handleGetLocation}
      placeholder="18 Stamford Road, Apethorpe, United Kingdom"
      tooltipContent={<p>Set Current Location</p>}
    />
  );
}

export default LocationInput;
