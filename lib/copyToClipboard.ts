import { message as Alert } from "antd";
export default function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      Alert.success("Copied to clipboard");
    })
    .catch(() => Alert.error("Failed to copy to clipboard"));
}
