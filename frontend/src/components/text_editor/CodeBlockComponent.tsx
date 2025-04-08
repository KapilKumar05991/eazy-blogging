import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'

export default ({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }:any) => (
  <NodeViewWrapper className="code-block">
    <select contentEditable={false} defaultValue={defaultLanguage} onChange={event => updateAttributes({ language: event.target.value })}>
      <option value={'javascript'}>
        auto
      </option>
      {extension.options.lowlight.listLanguages().map((lang:any, index:number) => (
        <option key={index} value={lang}>
          {lang}
        </option>
      ))}
    </select>
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
)