import { useState, FC } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { COLORS, FONT } from "../utils/constant";

interface DropdownSelectProps {
  label?: string;
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const DropdownSelect: FC<DropdownSelectProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOptionSelect = (option: string) => {
    onValueChange(option);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectButtonText}>
          {selectedValue || "Select an option"}
        </Text>
        <Icon
          name={isModalVisible ? "chevron-up" : "chevron-down"}
          size={20}
          color="#fff"
          style={styles.icon}
        />
      </TouchableOpacity>

      <Modal
        transparent
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)} // Close modal on outside press
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleOptionSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    color: "#fff",
    fontFamily: FONT.SpaceMono,
  },
  selectButton: {
    height: 50,
    borderColor: "#A1A1B5",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.ACCENT,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectButtonText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: FONT.SpaceMono,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#1C1C26",
    borderRadius: 10,
    padding: 20,
    maxHeight: "60%",
  },
  option: {
    paddingVertical: 10,
  },
  icon: {
    marginLeft: 10, // Space between text and icon
  },
  optionText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: FONT.SpaceMono
  },
});

export default DropdownSelect;
