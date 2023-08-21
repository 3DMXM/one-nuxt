import { marked } from 'marked';
import 'github-markdown-css/github-markdown-dark.css'

marked.setOptions({
    breaks: true,
})

// const link: marked.TokenizerExtension | marked.RendererExtension | (marked.TokenizerExtension & marked.RendererExtension) = {
//     name: 'link',
//     start(this, src: string) { return 1; }, // 提示 Marked.js 停止并检查是否匹配
//     renderer(this: marked.RendererThis, token: marked.Tokens.Generic): string {
//         return `<a href="${token.href}" target="_blank">${token.text}</a> `;
//     }
// }

// marked.use({
//     extensions: [link]
// })

export default marked;