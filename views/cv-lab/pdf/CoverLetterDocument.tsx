import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import type { ResumeProfile, ResumeTheme } from "@/types";
import {
  DENSITY_PADDING,
  FONT_SIZE_PX,
  pdfFontFamily,
  formatDisplayUrl,
  pdfPageSize,
  coverLetterGreeting,
} from "@/lib";

interface CoverLetterDocumentProps {
  body: string;
  profile: ResumeProfile;
  theme: ResumeTheme;
  placeholders?: { company?: string; role?: string; hiringManager?: string };
}

export function CoverLetterDocument({
  body,
  profile,
  theme,
  placeholders,
}: CoverLetterDocumentProps) {
  const bodyFont = pdfFontFamily(theme.bodyFontId);
  const headingFont = pdfFontFamily(theme.headingFontId, "bold");
  const fontSize = Math.max(FONT_SIZE_PX[theme.fontSize], 10.5);
  const pad = Math.max(DENSITY_PADDING[theme.density], 48);

  const styles = StyleSheet.create({
    page: {
      paddingTop: pad,
      paddingBottom: pad,
      paddingHorizontal: pad + 8,
      fontSize,
      fontFamily: bodyFont,
      color: theme.bodyColor || "#1c1c1c",
      lineHeight: 1.55,
    },
    name: {
      fontSize: fontSize + 6,
      fontFamily: headingFont,
      textAlign: "center",
      marginBottom: 6,
      color: theme.headingColor || "#16233c",
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 4,
      textAlign: "center",
      marginBottom: 22,
    },
    contactItem: { color: "#7a7a7a", fontSize: fontSize - 1 },
    date: { marginBottom: 16, color: "#333333" },
    recipient: { marginBottom: 16, color: "#7a7a7a" },
    para: { marginBottom: 12, color: "#1c1c1c", lineHeight: 1.55 },
    sign: { marginTop: 22, color: "#1c1c1c" },
  });

  const contact: Array<{ label: string; href?: string }> = [];
  if (profile.email) contact.push({ label: profile.email, href: `mailto:${profile.email}` });
  if (profile.phone) {
    contact.push({
      label: profile.phone,
      href: `tel:${profile.phone.replace(/[^\d+]/g, "")}`,
    });
  }
  if (profile.location) contact.push({ label: profile.location });
  for (const link of profile.links.filter((l) => l.url)) {
    const href = link.url.startsWith("http") ? link.url : `https://${link.url}`;
    contact.push({ label: formatDisplayUrl(link.url), href });
  }

  const greeting = coverLetterGreeting(placeholders?.hiringManager);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size={pdfPageSize(theme.pageSize)} style={styles.page}>
        <Text style={styles.name}>{profile.name}</Text>
        <View style={styles.contactRow}>
          {contact.map((item, i) => (
            <View key={`${item.label}-${i}`} style={{ flexDirection: "row", alignItems: "center" }}>
              {i > 0 ? <Text style={styles.contactItem}>  |  </Text> : null}
              {item.href ? (
                <Link src={item.href}>
                  <Text style={styles.contactItem}>{item.label}</Text>
                </Link>
              ) : (
                <Text style={styles.contactItem}>{item.label}</Text>
              )}
            </View>
          ))}
        </View>
        <Text style={styles.date}>{today}</Text>
        <View style={styles.recipient}>
          <Text>{greeting}</Text>
          <Text>{placeholders?.company?.trim() || ""}</Text>
        </View>
        <Text style={styles.para}>Dear {greeting},</Text>
        {body.split(/\n\n+/).map((paragraph, i) => (
          <Text key={i} style={styles.para}>
            {paragraph.trim()}
          </Text>
        ))}
        <View style={styles.sign}>
          <Text>Sincerely,</Text>
          <Text>{profile.name}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default CoverLetterDocument;
