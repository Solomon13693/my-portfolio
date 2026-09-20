'use client'

import { TextArea } from '@/components/ui/form'
import { useCoverLetters } from '@/hooks'

export function TemplateEditor() {
 const { state, updateTemplate } = useCoverLetters()

 return (
 <div>
 <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Base template</p>
 <p className="mt-1 text-xs text-muted-foreground">
 Use {'{{company}}'}, {'{{role}}'}, {'{{hiringManager}}'} as placeholders / &quot;Apply to letter&quot; fills them in.
 </p>
 <div className="mt-3">
 <TextArea
 name="template"
 radius="none"
 className="h-56"
 fullWidth
 value={state.template.body}
 onChange={(e) => updateTemplate(e.target.value)}
 />
 </div>
 </div>
 )
}

export default TemplateEditor
