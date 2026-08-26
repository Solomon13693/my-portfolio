import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'react-email'

export interface ContactEmailTemplateProps {
  name: string
  email: string
  phone: string
  message: string
}

const colors = {
  page: '#f4f4f5',
  card: '#ffffff',
  ink: '#171717',
  muted: '#71717a',
  line: '#e4e4e7',
  dark: '#0a0a0a',
  onDark: '#ededed',
  faint: '#a1a1aa',
}

const fontSans = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
const fontMono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

export default function ContactEmailTemplate({
  name,
  email,
  phone,
  message,
}: ContactEmailTemplateProps) {
  const preview = `${name} sent a message from your portfolio`

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <table cellPadding={0} cellSpacing={0} role="presentation" width="100%">
              <tr>
                <td style={styles.markCell}>
                  <div style={styles.mark}>SA</div>
                </td>
                <td>
                  <Text style={styles.kicker}>New inquiry</Text>
                  <Heading as="h1" style={styles.brand}>
                    Solomon Adeoye
                  </Heading>
                </td>
              </tr>
            </table>
          </Section>

          <Section style={styles.content}>
            <Text style={styles.intro}>
              <strong style={styles.strong}>{name}</strong> wrote from the contact form.
            </Text>

            <Hr style={styles.rule} />

            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{name}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>
              <Link href={`mailto:${email}`} style={styles.link}>
                {email}
              </Link>
            </Text>

            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>
              <Link href={`tel:${phone.replace(/\s/g, '')}`} style={styles.link}>
                {phone}
              </Link>
            </Text>

            <Hr style={styles.rule} />

            <Text style={styles.label}>Message</Text>
            <Section style={styles.messageBox}>
              <Text style={styles.message}>{message}</Text>
            </Section>

            <Button href={`mailto:${email}`} style={styles.button}>
              Reply to {name}
            </Button>
          </Section>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              Sent from the portfolio contact form · Lagos, Nigeria
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

ContactEmailTemplate.PreviewProps = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+234 706 662 5389',
  message:
    'Hi Solomon — I have a product I want to take from idea to launch. Could we talk about timeline and stack?',
} satisfies ContactEmailTemplateProps

const styles = {
  body: {
    backgroundColor: colors.page,
    fontFamily: fontSans,
    margin: 0,
    padding: '32px 16px',
  },
  container: {
    backgroundColor: colors.card,
    border: `1px solid ${colors.line}`,
    margin: '0 auto',
    maxWidth: '560px',
    width: '100%',
  },
  header: {
    backgroundColor: colors.dark,
    padding: '28px 32px',
  },
  markCell: {
    width: '48px',
    verticalAlign: 'middle' as const,
    paddingRight: '14px',
  },
  mark: {
    border: `1px solid ${colors.onDark}`,
    borderRadius: '999px',
    color: colors.onDark,
    fontFamily: fontMono,
    fontSize: '10px',
    fontWeight: 500,
    height: '36px',
    letterSpacing: '0.08em',
    lineHeight: '36px',
    textAlign: 'center' as const,
    width: '36px',
  },
  kicker: {
    color: colors.faint,
    fontFamily: fontMono,
    fontSize: '11px',
    letterSpacing: '0.16em',
    margin: '0 0 4px',
    textTransform: 'uppercase' as const,
  },
  brand: {
    color: colors.onDark,
    fontSize: '20px',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    lineHeight: '1.3',
    margin: 0,
  },
  content: {
    padding: '32px',
  },
  intro: {
    color: colors.ink,
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 8px',
  },
  strong: {
    fontWeight: 600,
  },
  rule: {
    borderColor: colors.line,
    borderTop: `1px solid ${colors.line}`,
    margin: '24px 0',
  },
  label: {
    color: colors.muted,
    fontFamily: fontMono,
    fontSize: '11px',
    letterSpacing: '0.14em',
    margin: '0 0 4px',
    textTransform: 'uppercase' as const,
  },
  value: {
    color: colors.ink,
    fontSize: '15px',
    lineHeight: '1.5',
    margin: '0 0 16px',
  },
  link: {
    color: colors.ink,
    textDecoration: 'underline',
  },
  messageBox: {
    backgroundColor: colors.page,
    border: `1px solid ${colors.line}`,
    margin: '0 0 28px',
    padding: '16px 18px',
  },
  message: {
    color: colors.ink,
    fontSize: '15px',
    lineHeight: '1.7',
    margin: 0,
    whiteSpace: 'pre-wrap' as const,
  },
  button: {
    backgroundColor: colors.dark,
    color: colors.onDark,
    display: 'inline-block',
    fontFamily: fontMono,
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.12em',
    lineHeight: '100%',
    padding: '14px 22px',
    textAlign: 'center' as const,
    textDecoration: 'none',
    textTransform: 'uppercase' as const,
  },
  footer: {
    borderTop: `1px solid ${colors.line}`,
    padding: '18px 32px 22px',
  },
  footerText: {
    color: colors.muted,
    fontFamily: fontMono,
    fontSize: '11px',
    letterSpacing: '0.04em',
    margin: 0,
  },
} as const
