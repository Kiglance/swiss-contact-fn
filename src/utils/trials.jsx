import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

const data = [
  {
    schoolName: "School Two",
    district: "Karongi",
    sector: "Muganza",
    phone: 92282202880,
    email: "two@mail.com",
    userName: "twopo",
    tags: "revoked",
  },
  {
    schoolName: "School One",
    district: "Rusizi",
    sector: "Muganza",
    phone: 92282202880,
    email: "one@mail.com",
    userName: "onepo",
    tags: "granted",
  },
  {
    schoolName: "School Nine",
    district: "Nyamasheke",
    sector: "Nyendo",
    phone: 92282202880,
    email: "nine@mail.com",
    userName: "nine",
    tags: "pending",
  },
  {
    schoolName: "Gs Nyaga",
    district: "Nyagatare",
    sector: "Funzo",
    phone: 989279211,
    email: "nyaga@mail.com",
    userName: "nyaga",
    tags: "revoked",
  },
  {
    schoolName: "School Onety",
    district: "Rusizit",
    sector: "Karenzo",
    phone: 2848844380,
    email: "onety@mail.com",
    userName: "onety",
    tags: "pending",
  },
  {
    schoolName: "School Seven",
    district: "Nyamasheke",
    sector: "Nyendo",
    phone: 92282202880,
    email: "seven@mail.com",
    userName: "seven",
    tags: "granted",
  },
  {
    schoolName: "School Six",
    district: "Nyamasheke",
    sector: "Nyendo",
    phone: 92282202880,
    email: "six@mail.com",
    userName: "six",
    tags: "revoked",
  },
  {
    schoolName: "Gishoma",
    district: "Rubavu",
    sector: "Funga",
    phone: 789933604,
    email: "gishoma@mail.com",
    userName: "gishoma",
    tags: "granted",
  },
  {
    schoolName: "School Three",
    district: "Rusizi",
    sector: "Karenzo",
    phone: 92282202880,
    email: "three@mail.com",
    userName: "three",
    tags: "pending",
  },
  {
    schoolName: "Gs Nyamagabe Gakondp",
    district: "Rubavu",
    sector: "Funga",
    phone: 789933604,
    email: "herta@mail.com",
    userName: "herta",
    tags: "pending",
  },
  {
    schoolName: "Gs Kamembe",
    district: "Rubavu",
    sector: "Funga",
    phone: 789933604,
    email: "rutayisire@mail.com",
    userName: "kemembe",
    tags: "granted",
  },
];

const MyPDFViewer = () => (
  <PDFViewer width={900} height={900}>
    <Document>
      <Page
        size="A4"
        style={{
          padding: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#ccc",
            // width: 500,
            // height: 400,
          }}
        >
          {data?.map((school, id) => {
            return (
              <View>
                {" "}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {id + 1}:
                  </Text>
                  <Text
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {school.schoolName}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default MyPDFViewer;
