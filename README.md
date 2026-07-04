# Qwibo Website

Official landing site for **Qwibo** — local Italian audio/video transcription with NVIDIA NeMo Parakeet.

Built with **Jekyll** and deployed on GitHub Pages.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

## Documentation

MkDocs HTML is published into `docs/` from the main repo:

```cmd
cd ..\qwibo
scripts\publish_docs.bat
cd ..\qwibo.github.io
git push
```

Main project: [github.com/qwibo/qwibo](https://github.com/qwibo/qwibo)
