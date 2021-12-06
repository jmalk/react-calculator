# Learnings

Things I've learned from this project.

- Practised React.
- Practised TDD to build up a calculator without really thinking about how it was all going to work. Started with "1 should show 1 on screen".
- Learned the basics of React Testing Library.
- `<output>` element exists, has role of "status" which most browsers treat as a live area for screen reader purposes. That is, when the output changes, the reader will stop what it's doing to announce that.
- CSS variables are a neat way to theme a project - quick to change the variables to re-theme everything.
- Can stick a load of variables in the `:root` selector.
- I've gone with class names for each element that tell you little about how they will look. There is a school of thought that CSS classes should just be about looks e.g. `"bg-gray-100 rounded-xl p-8"` from https://tailwindcss.com/
- CSS `calc` function means you can base lots of dimensions on a few base variables - in my case, the height of the buttons was a useful "unit". I'd like to learn more about CSS dimensions though, e.g. I think ems and rems let you base sizes on font-height. That seems like a good basis for a website. In the case of this calculator there isn't much text so it's not such an obvious choice for the base unit.
- CSS overflow property is a quick way to hide your sins (of not properly rounding the answer to calculations).
