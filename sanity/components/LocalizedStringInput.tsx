

import { Stack, TextInput, Text } from "@sanity/ui";
import { set, unset } from "sanity";
import type { ObjectInputProps } from "sanity";

export default function LocalizedStringInput(props: ObjectInputProps) {
  const { value = {}, onChange } = props;

  const handleChange = (locale: "ru" | "en", nextValue: string) => {
    if (!nextValue) {
      onChange(unset([locale]));
    } else {
      onChange(set(nextValue, [locale]));
    }
  };

  return (
    <Stack space={4}>
      {/* RU */}
      <Stack space={3}>
        <Text size={1} weight="medium">
          RU
        </Text>
        <TextInput
          value={value.ru || ""}
          onChange={(e) => handleChange("ru", e.currentTarget.value)}
        />
      </Stack>

      {/* EN */}
      <Stack space={3}>
        <Text size={1} weight="medium">
          EN
        </Text>
        <TextInput
          value={value.en || ""}
          onChange={(e) => handleChange("en", e.currentTarget.value)}
        />
      </Stack>
    </Stack>
  );
}