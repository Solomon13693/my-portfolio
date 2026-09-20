import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import type { ResumeDraft, ResumeSection, ResumeTheme } from "@/types";
import {
  DENSITY_PADDING,
  FONT_SIZE_PX,
  LINE_HEIGHT_VALUE,
  SECTION_GAP_PX,
  pdfFontFamily,
  formatDisplayUrl,
  pdfPageSize,
} from "@/lib";
import {
  groupTagsByCategory,
  visibleSections,
} from "@/views/cv-lab/components/templates/shared";

function buildStyles(theme: ResumeTheme) {
  const bodyFont = pdfFontFamily(theme.bodyFontId);
  const headingFont = pdfFontFamily(theme.headingFontId, "bold");
  const bodyBold = pdfFontFamily(theme.bodyFontId, "bold");
  const fontSize = FONT_SIZE_PX[theme.fontSize];
  const lineHeight = LINE_HEIGHT_VALUE[theme.lineHeight];
  const gap = SECTION_GAP_PX[theme.sectionGap];
  const pad = DENSITY_PADDING[theme.density];

  return StyleSheet.create({
    page: {
      paddingTop: pad * 0.7,
      paddingBottom: pad * 0.7,
      paddingHorizontal: pad * 1.2,
      fontSize,
      fontFamily: bodyFont,
      color: theme.bodyColor,
      lineHeight,
    },
    name: {
      fontSize: 22,
      fontFamily: headingFont,
      color: theme.headingColor,
      textAlign: "center",
      marginBottom: 2,
    },
    headline: {
      fontSize: 11,
      fontStyle: "italic",
      color: theme.mutedColor,
      textAlign: "center",
      marginBottom: 8,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 12,
      marginBottom: 4,
    },
    contactItem: { fontSize: 9, color: theme.bodyColor },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: "#d9d9d9",
      marginTop: 6,
      marginBottom: 4,
    },
    sectionBar: {
      backgroundColor: theme.accentColor,
      paddingVertical: 4,
      paddingHorizontal: 8,
      marginTop: 8,
      marginBottom: 6,
      alignItems: "center",
    },
    sectionTitle: {
      fontSize: 11,
      fontFamily: headingFont,
      color: theme.headingColor,
      textAlign: "center",
    },
    section: { marginBottom: gap * 0.35 },
    job: { marginBottom: 8 },
    jobHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 8,
    },
    company: {
      fontSize: 10.5,
      fontFamily: headingFont,
      color: theme.headingColor,
    },
    dates: {
      fontSize: 9.5,
      fontFamily: headingFont,
      color: theme.headingColor,
    },
    jobTitle: {
      fontSize: 10,
      fontStyle: "italic",
      color: theme.mutedColor,
      marginBottom: 3,
    },
    tech: { fontSize: fontSize - 0.5, color: theme.bodyColor, marginBottom: 3 },
    bold: { fontFamily: bodyBold, color: theme.headingColor },
    bodyText: { color: theme.bodyColor, marginBottom: 4 },
    bulletRow: { flexDirection: "row", marginBottom: 2 },
    bulletDot: { width: 10 },
    bulletText: { flex: 1, color: theme.bodyColor },
    muted: { color: theme.mutedColor, fontSize: fontSize - 0.5 },
    sidebarPage: {
      flexDirection: "row",
      fontSize,
      fontFamily: bodyFont,
      color: theme.bodyColor,
    },
    sidebar: {
      width: "42%",
      backgroundColor: theme.accentColor,
      padding: pad * 0.8,
    },
    main: { width: "58%", padding: pad * 0.85 },
  });
}

function SectionBar({
  title,
  styles,
  theme,
}: {
  title: string;
  styles: ReturnType<typeof buildStyles>;
  theme: ResumeTheme;
}) {
  const layout = theme.layoutStyle ?? "banded";
  if (layout === "banded") {
    return (
      <View style={styles.sectionBar}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
    );
  }
  if (layout === "left-rule") {
    return (
      <View
        style={{
          borderLeftWidth: 4,
          borderLeftColor: theme.accentColor,
          paddingLeft: 6,
          marginTop: 8,
          marginBottom: 6,
        }}
      >
        <Text style={[styles.sectionTitle, { textAlign: "left" }]}>
          {title}
        </Text>
      </View>
    );
  }
  if (layout === "banner" || layout === "ats" || layout === "dense") {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: theme.headingColor,
          marginTop: 8,
          marginBottom: 6,
          paddingBottom: 2,
        }}
      >
        <Text
          style={[
            styles.sectionTitle,
            { textAlign: "left", textTransform: "uppercase", fontSize: 9 },
          ]}
        >
          {title}
        </Text>
      </View>
    );
  }
  if (layout === "timeline") {
    return (
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: theme.accentColor,
          marginTop: 8,
          marginBottom: 6,
          paddingBottom: 3,
        }}
      >
        <Text style={[styles.sectionTitle, { textAlign: "left" }]}>
          {title}
        </Text>
      </View>
    );
  }
  if (layout === "creative") {
    return (
      <View style={{ marginTop: 8, marginBottom: 6 }}>
        <Text
          style={[
            styles.sectionTitle,
            { textAlign: "left", fontSize: 13, fontStyle: "italic" },
          ]}
        >
          {title}
        </Text>
      </View>
    );
  }
  // minimal / editorial / sidebar
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: theme.accentColor,
        marginTop: 10,
        marginBottom: 6,
        paddingBottom: 3,
      }}
    >
      <Text
        style={[
          styles.sectionTitle,
          {
            textAlign: "left",
            textTransform: "uppercase",
            fontSize: 9,
            letterSpacing: 1.5,
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
}

function renderPdfSection(
  section: ResumeSection,
  styles: ReturnType<typeof buildStyles>,
  theme: ResumeTheme,
) {
  if (section.layout === "text") {
    if (!section.content.trim()) return null;
    return (
      <View key={section.id} style={styles.section}>
        <SectionBar title={section.title} styles={styles} theme={theme} />
        <Text style={styles.bodyText}>{section.content}</Text>
      </View>
    );
  }

  if (section.layout === "timeline") {
    const entries = section.entries.filter(
      (e) => e.visible && e.roles.some((r) => r.visible),
    );
    if (!entries.length) return null;
    return (
      <View key={section.id} style={styles.section}>
        <SectionBar title={section.title} styles={styles} theme={theme} />
        {entries.map((entry) => {
          const roles = entry.roles.filter((r) => r.visible);
          if (roles.length <= 1) {
            const role = roles[0];
            if (!role) return null;
            return (
              <View key={entry.id} style={styles.job}>
                <View style={styles.jobHeader}>
                  <Text style={styles.company}>{entry.organization}</Text>
                  <Text style={styles.dates}>{role.period}</Text>
                </View>
                <Text style={styles.jobTitle}>{role.title}</Text>
                {role.tools.length > 0 ? (
                  <Text style={styles.tech}>
                    <Text style={styles.bold}>Technologies: </Text>
                    {role.tools.join(", ")}
                  </Text>
                ) : null}
                {role.bullets.filter(Boolean).map((bullet, i) => (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            );
          }

          return (
            <View key={entry.id} style={styles.job}>
              <Text style={styles.company}>{entry.organization}</Text>
              {roles.map((role) => (
                <View key={role.id} style={{ marginTop: 4 }}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobTitle}>{role.title}</Text>
                    <Text style={styles.dates}>{role.period}</Text>
                  </View>
                  {role.tools.length > 0 ? (
                    <Text style={styles.tech}>
                      <Text style={styles.bold}>Technologies: </Text>
                      {role.tools.join(", ")}
                    </Text>
                  ) : null}
                  {role.bullets.filter(Boolean).map((bullet, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          );
        })}
      </View>
    );
  }

  if (section.layout === "list") {
    const entries = section.entries.filter((e) => e.visible);
    if (!entries.length) return null;
    return (
      <View key={section.id} style={styles.section}>
        <SectionBar title={section.title} styles={styles} theme={theme} />
        {entries.map((entry) => (
          <View key={entry.id} style={{ marginBottom: 5 }}>
            <View style={styles.jobHeader}>
              <Text style={styles.company}>{entry.title}</Text>
              {entry.meta ? (
                <Text style={styles.muted}>{entry.meta}</Text>
              ) : null}
            </View>
            {entry.subtitle ? (
              <Text style={styles.jobTitle}>{entry.subtitle}</Text>
            ) : null}
            {entry.description ? (
              <Text style={styles.bodyText}>{entry.description}</Text>
            ) : null}
            {entry.href ? (
              <Link src={entry.href}>
                <Text style={styles.muted}>{entry.href}</Text>
              </Link>
            ) : null}
          </View>
        ))}
      </View>
    );
  }

  const groups = groupTagsByCategory(section);
  if (!groups.length) return null;
  return (
    <View key={section.id} style={styles.section}>
      <SectionBar title={section.title} styles={styles} theme={theme} />
      {groups.map(([category, names]) => (
        <Text key={category} style={{ marginBottom: 2 }}>
          <Text style={styles.bold}>{category}: </Text>
          {names.join(", ")}
        </Text>
      ))}
    </View>
  );
}

function buildContactItems(draft: ResumeDraft): Array<{ label: string; href?: string }> {
  const items: Array<{ label: string; href?: string }> = [];
  if (draft.profile.email) {
    items.push({ label: draft.profile.email, href: `mailto:${draft.profile.email}` });
  }
  if (draft.profile.phone) {
    items.push({
      label: draft.profile.phone,
      href: `tel:${draft.profile.phone.replace(/[^\d+]/g, "")}`,
    });
  }
  if (draft.profile.location) {
    items.push({ label: draft.profile.location });
  }
  for (const link of draft.profile.links) {
    if (!link.url) continue;
    const href = link.url.startsWith("http") ? link.url : `https://${link.url}`;
    items.push({ label: formatDisplayUrl(link.url), href });
  }
  return items;
}

function ContactText({
  item,
  style,
}: {
  item: { label: string; href?: string };
  style: Style;
}) {
  if (item.href) {
    return (
      <Link src={item.href}>
        <Text style={style}>{item.label}</Text>
      </Link>
    );
  }
  return <Text style={style}>{item.label}</Text>;
}

function ProfileBlock({
  draft,
  styles,
  theme,
}: {
  draft: ResumeDraft;
  styles: ReturnType<typeof buildStyles>;
  theme: ResumeTheme;
}) {
  const contact = buildContactItems(draft);
  const layout = theme.layoutStyle ?? "banded";

  if (layout === "banner") {
    return (
      <View
        style={{
          backgroundColor: theme.accentColor,
          padding: 16,
          marginBottom: 12,
          marginHorizontal: -20,
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: 20,
            fontFamily: styles.name.fontFamily,
          }}
        >
          {draft.profile.name}
        </Text>
        {draft.profile.headline ? (
          <Text style={{ color: "#ffffffcc", fontSize: 10, marginTop: 2 }}>
            {draft.profile.headline}
          </Text>
        ) : null}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {contact.map((item, i) => (
            <View key={`${item.label}-${i}`} style={{ flexDirection: "row", alignItems: "center" }}>
              {i > 0 ? <Text style={{ color: "#ffffffb3", fontSize: 8 }}> · </Text> : null}
              <ContactText item={item} style={{ color: "#ffffffb3", fontSize: 8 }} />
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (layout === "banded") {
    return (
      <View>
        <Text style={styles.name}>{draft.profile.name}</Text>
        {draft.profile.headline ? (
          <Text style={styles.headline}>{draft.profile.headline}</Text>
        ) : null}
        <View style={styles.contactRow}>
          {contact.map((item, i) => (
            <ContactText key={`${item.label}-${i}`} item={item} style={styles.contactItem} />
          ))}
        </View>
        <View style={styles.hr} />
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 8 }}>
      <Text
        style={[
          styles.name,
          { textAlign: "left", fontSize: layout === "editorial" ? 26 : 18 },
        ]}
      >
        {draft.profile.name}
      </Text>
      {draft.profile.headline ? (
        <Text style={[styles.headline, { textAlign: "left" }]}>
          {draft.profile.headline}
        </Text>
      ) : null}
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 4, gap: 4 }}>
        {contact.map((item, i) => (
          <View key={`${item.label}-${i}`} style={{ flexDirection: "row", alignItems: "center" }}>
            {i > 0 ? <Text style={styles.contactItem}> · </Text> : null}
            <ContactText item={item} style={styles.contactItem} />
          </View>
        ))}
      </View>
      {layout === "left-rule" ? (
        <View
          style={{
            height: 2,
            backgroundColor: theme.accentColor,
            marginTop: 8,
          }}
        />
      ) : (
        <View style={styles.hr} />
      )}
    </View>
  );
}

function SingleColumnDoc({ draft }: { draft: ResumeDraft }) {
  const theme = draft.theme;
  const styles = buildStyles(theme);
  const sections = visibleSections(draft);

  return (
    <Document>
      <Page size={pdfPageSize(theme.pageSize)} style={styles.page}>
        <ProfileBlock draft={draft} styles={styles} theme={theme} />
        {sections.map((section) => renderPdfSection(section, styles, theme))}
      </Page>
    </Document>
  );
}

function SidebarDoc({
  draft,
  side,
}: {
  draft: ResumeDraft;
  side: "left" | "right";
}) {
  const theme = draft.theme;
  const styles = buildStyles(theme);
  const main = visibleSections(draft, "main");
  const sidebar = visibleSections(draft, "sidebar");

  const sidebarView = (
    <View style={styles.sidebar}>
      <Text style={[styles.company, { fontSize: 14, marginBottom: 4 }]}>
        {draft.profile.name}
      </Text>
      {draft.profile.headline ? (
        <Text style={styles.muted}>{draft.profile.headline}</Text>
      ) : null}
      <View style={{ marginTop: 8 }}>
        {draft.profile.email ? (
          <Link src={`mailto:${draft.profile.email}`}>
            <Text style={styles.muted}>{draft.profile.email}</Text>
          </Link>
        ) : null}
        {draft.profile.phone ? (
          <Link src={`tel:${draft.profile.phone.replace(/[^\d+]/g, "")}`}>
            <Text style={styles.muted}>{draft.profile.phone}</Text>
          </Link>
        ) : null}
        {draft.profile.location ? (
          <Text style={styles.muted}>{draft.profile.location}</Text>
        ) : null}
        {draft.profile.links
          .filter((l) => l.url)
          .map((l) => {
            const href = l.url.startsWith("http") ? l.url : `https://${l.url}`;
            return (
              <Link key={l.id} src={href}>
                <Text style={styles.muted}>{formatDisplayUrl(l.url)}</Text>
              </Link>
            );
          })}
      </View>
      <View style={{ marginTop: 10 }}>
        {sidebar.map((section) => renderPdfSection(section, styles, theme))}
      </View>
    </View>
  );

  const mainView = (
    <View style={styles.main}>
      {main.map((section) => renderPdfSection(section, styles, theme))}
    </View>
  );

  return (
    <Document>
      <Page size={pdfPageSize(theme.pageSize)} style={styles.sidebarPage}>
        {side === "left" ? (
          <>
            {sidebarView}
            {mainView}
          </>
        ) : (
          <>
            {mainView}
            {sidebarView}
          </>
        )}
      </Page>
    </Document>
  );
}

export function ResumeDocument({ draft }: { draft: ResumeDraft }) {
  if (draft.skeletonId === "sidebar-left")
    return <SidebarDoc draft={draft} side="left" />;
  if (draft.skeletonId === "sidebar-right")
    return <SidebarDoc draft={draft} side="right" />;
  return <SingleColumnDoc draft={draft} />;
}

export default ResumeDocument;
