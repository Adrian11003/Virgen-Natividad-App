import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import * as Animatable from "react-native-animatable";

const style = StyleSheet.create({
  customSweetAlertOuter: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  customSweetAlertBox: {
    width: 400,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  customSweetAlertIcon: {
    height: 80,
    width: 80,
    borderColor: "#009ddf",
    borderWidth: 2,
    borderRadius: 160,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  customAlertIconFa: {
    color: "#009ddf",
  },
  customSweetAlertTitle: {
    fontSize: 25,
    color: "rgba(0,0,0,0.7)",
    marginBottom: 2,
    textAlign: "center",
  },
  customSweetAlertText: {
    fontSize: 17,
    textAlign: "center",
  },
  customSweetAlertButtons: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
    gap: 10,
  },
  customSweetAlertButton: {
    height: 35,
    paddingHorizontal: 25,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  customSweetAlertButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

const SweetAlert = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [cancelButtonText, setCancelButtonText] = useState("");
  const [confirmButtonText, setConfirmButtonText] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => {});
  const [onClosing, setOnClosing] = useState(() => {});
  const [iconName, setIconName] = useState("");
  const [iconColor, setIconColor] = useState("");

  const handleConfirm = () => {
    setShowModal(false);
    onConfirm();
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      onClosing();
    }, 200);
  };

  const showSweetAlert = (params) => {
    const {
      title,
      text,
      showCancelButton,
      cancelButtonText,
      confirmButtonText,
      onConfirm,
      onClose,
      type,
    } = params;

    setTitle(title);
    setText(text);
    setShowCancelButton(showCancelButton);
    setCancelButtonText(cancelButtonText);
    setConfirmButtonText(confirmButtonText);
    setOnConfirm(() => onConfirm);
    setOnClosing(() => onClose);

    switch (type) {
      case "info":
        setIconName("info");
        setIconColor("#3498db");
        break;
      case "success":
        setIconName("check");
        setIconColor("#2ecc71");
        break;
      case "danger":
        setIconName("times");
        setIconColor("#e74c3c");
        break;
      case "warning":
        setIconName("exclamation");
        setIconColor("#f39c12");
        break;
      default:
        setIconName("");
        setIconColor("");
        break;
    }

    setShowModal(true);
  };

  showSweetAlertRef = showSweetAlert;

  return (
    <>
      <Modal animationType="fade" visible={showModal} transparent={true}>
        <View style={style.customSweetAlertOuter}>
          <Animatable.View animation="bounceIn" style={style.customSweetAlertBox}>
            <Animatable.View
              animation="jello"
              duration={500}
              style={[
                style.customSweetAlertIcon,
                {
                  borderColor: iconColor,
                },
              ]}
            >
              <Animatable.View duration={1600} animation="rubberBand">
                <FontAwesome5
                  size={38}
                  style={[
                    style.customAlertIconFa,
                    {
                      color: iconColor,
                    },
                  ]}
                  name={iconName}
                />
              </Animatable.View>
            </Animatable.View>
            <Text style={style.customSweetAlertTitle}>{title}</Text>
            <Text style={style.customSweetAlertText}>{text}</Text>
            <View style={style.customSweetAlertButtons}>
              {showCancelButton && (
                <TouchableOpacity
                  onPress={closeModal}
                  style={[
                    style.customSweetAlertButton,
                    {
                      backgroundColor: "#e74c3c",
                    },
                  ]}
                >
                  <Text
                    style={[
                      style.customSweetAlertButtonText,
                      {
                        color: "#fff",
                      },
                    ]}
                  >
                    {cancelButtonText}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={handleConfirm}
                style={[
                  style.customSweetAlertButton,
                  {
                    backgroundColor: "#81ea74",
                  },
                ]}
              >
                <Text
                  style={[
                    style.customSweetAlertButtonText,
                    {
                      color: "#000",
                    },
                  ]}
                >
                  {confirmButtonText}
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </Modal>
    </>
  );
};

let showSweetAlertRef;

export const showSweetAlert = (params) => {
  if (showSweetAlertRef) {
    showSweetAlertRef(params);
  }
};

export default SweetAlert;
