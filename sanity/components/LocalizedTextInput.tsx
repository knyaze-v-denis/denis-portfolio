import { Stack, Text, TextArea } from "@sanity/ui";
import { set, unset } from "sanity";
import type { ObjectInputProps } from "sanity";

export default function LocalizedTextInput(props: ObjectInputProps) {
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
      <Stack space={3}>
        <Text size={1} weight="medium">
          RU
        </Text>
        <TextArea
          value={value.ru || ""}
          onChange={(e) => handleChange("ru", e.currentTarget.value)}
          rows={4}
        />
      </Stack>

      <Stack space={3}>
        <Text size={1} weight="medium">
          EN
        </Text>
        <TextArea
          value={value.en || ""}
          onChange={(e) => handleChange("en", e.currentTarget.value)}
          rows={4}
        />
      </Stack>
    </Stack>
  );
}
