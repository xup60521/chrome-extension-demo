// vite.config.ts
import react from "file:///D:/code/side_project/vite-web-extension/node_modules/@vitejs/plugin-react/dist/index.mjs";

// custom-vite-plugins.ts
import fs from "fs";
import { resolve } from "path";
var __vite_injected_original_dirname = "D:\\code\\side_project\\vite-web-extension";
function stripDevIcons(isDev2) {
  if (isDev2) return null;
  return {
    name: "strip-dev-icons",
    resolveId(source) {
      return source === "virtual-module" ? source : null;
    },
    renderStart(outputOptions, inputOptions) {
      const outDir2 = outputOptions.dir;
      fs.rm(resolve(outDir2, "dev-icon-32.png"), () => console.log(`Deleted dev-icon-32.png from prod build`));
      fs.rm(resolve(outDir2, "dev-icon-128.png"), () => console.log(`Deleted dev-icon-128.png from prod build`));
    }
  };
}
function crxI18n(options) {
  if (!options.localize) return null;
  const getJsonFiles = (dir) => {
    const files2 = fs.readdirSync(dir, { recursive: true });
    return files2.filter((file) => !!file && file.endsWith(".json"));
  };
  const entry = resolve(__vite_injected_original_dirname, options.src);
  const localeFiles = getJsonFiles(entry);
  const files = localeFiles.map((file) => {
    return {
      id: "",
      fileName: file,
      source: fs.readFileSync(resolve(entry, file))
    };
  });
  return {
    name: "crx-i18n",
    enforce: "pre",
    buildStart: {
      order: "post",
      handler() {
        files.forEach((file) => {
          const refId = this.emitFile({
            type: "asset",
            source: file.source,
            fileName: "_locales/" + file.fileName
          });
          file.id = refId;
        });
      }
    }
  };
}

// vite.config.ts
import { resolve as resolve2 } from "path";
import { defineConfig } from "file:///D:/code/side_project/vite-web-extension/node_modules/vite/dist/node/index.js";
import { crx } from "file:///D:/code/side_project/vite-web-extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "web extension demo",
  description: "<description in manifest.json>",
  options_ui: {
    page: "src/pages/options/index.html"
  },
  background: {
    service_worker: "src/pages/background/index.ts",
    type: "module"
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: {
      "32": "icon-32.png"
    }
  },
  icons: {
    "128": "icon-128.png"
  },
  permissions: [
    "activeTab",
    "contextMenus"
  ],
  content_scripts: [
    {
      matches: [
        "http://*/*",
        "https://*/*",
        "<all_urls>"
      ],
      js: [
        "src/pages/content/index.tsx"
      ],
      css: [
        "contentStyle.css"
      ]
    }
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: [
        "contentStyle.css",
        "icon-128.png",
        "icon-32.png"
      ],
      matches: []
    }
  ]
};

// manifest.dev.json
var manifest_dev_default = {
  action: {
    default_icon: "public/dev-icon-32.png",
    default_popup: "src/pages/popup/index.html"
  },
  icons: {
    "128": "public/dev-icon-128.png"
  },
  web_accessible_resources: [
    {
      resources: [
        "contentStyle.css",
        "dev-icon-128.png",
        "dev-icon-32.png"
      ],
      matches: []
    }
  ]
};

// package.json
var package_default = {
  name: "vite-web-extension",
  version: "1.4.0",
  description: "A simple chrome & firefox extension template with Vite, React, TypeScript and Tailwind CSS.",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/JohnBra/web-extension.git"
  },
  scripts: {
    build: "vite build",
    dev: "nodemon"
  },
  type: "module",
  dependencies: {
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    "webextension-polyfill": "^0.12.0"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "2.0.0-beta.26",
    "@types/chrome": "^0.0.278",
    "@types/node": "^20.12.11",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@types/webextension-polyfill": "^0.10.7",
    "@typescript-eslint/eslint-plugin": "^7.8.0",
    "@typescript-eslint/parser": "^7.8.0",
    "@vitejs/plugin-react": "^4.2.1",
    autoprefixer: "^10.4.19",
    eslint: "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.2",
    "fs-extra": "^11.2.0",
    nodemon: "^3.1.0",
    postcss: "^8.4.38",
    tailwindcss: "^3.4.14",
    "ts-node": "^10.9.2",
    typescript: "^5.6.3",
    vite: "^5.4.10"
  }
};

// vite.config.ts
var __vite_injected_original_dirname2 = "D:\\code\\side_project\\vite-web-extension";
var root = resolve2(__vite_injected_original_dirname2, "src");
var pagesDir = resolve2(root, "pages");
var assetsDir = resolve2(root, "assets");
var outDir = resolve2(__vite_injected_original_dirname2, "dist");
var publicDir = resolve2(__vite_injected_original_dirname2, "public");
var isDev = process.env.__DEV__ === "true";
var localize = false;
var extensionManifest = {
  ...manifest_default,
  version: package_default.version,
  ...isDev ? manifest_dev_default : {},
  ...localize ? {
    name: "__MSG_extName__",
    description: "__MSG_extDescription__",
    default_locale: "en"
  } : {}
};
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [
    react(),
    crx({
      manifest: extensionManifest,
      browser: "chrome",
      // <-- change value to 'firefox' or 'chrome'
      contentScripts: {
        injectCss: true
      }
    }),
    stripDevIcons(isDev),
    crxI18n({
      localize,
      src: "./src/locales"
    })
  ],
  publicDir,
  build: {
    outDir,
    sourcemap: isDev,
    emptyOutDir: !isDev
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiY3VzdG9tLXZpdGUtcGx1Z2lucy50cyIsICJtYW5pZmVzdC5qc29uIiwgIm1hbmlmZXN0LmRldi5qc29uIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcc2lkZV9wcm9qZWN0XFxcXHZpdGUtd2ViLWV4dGVuc2lvblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kZVxcXFxzaWRlX3Byb2plY3RcXFxcdml0ZS13ZWItZXh0ZW5zaW9uXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RlL3NpZGVfcHJvamVjdC92aXRlLXdlYi1leHRlbnNpb24vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgeyBzdHJpcERldkljb25zLCBjcnhJMThuIH0gZnJvbSAnLi9jdXN0b20tdml0ZS1wbHVnaW5zJztcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHsgY3J4LCBNYW5pZmVzdFYzRXhwb3J0IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJztcclxuXHJcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL21hbmlmZXN0Lmpzb24nO1xyXG5pbXBvcnQgZGV2TWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5kZXYuanNvbic7XHJcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nO1xyXG5cclxuY29uc3Qgcm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyk7XHJcbmNvbnN0IHBhZ2VzRGlyID0gcmVzb2x2ZShyb290LCAncGFnZXMnKTtcclxuY29uc3QgYXNzZXRzRGlyID0gcmVzb2x2ZShyb290LCAnYXNzZXRzJyk7XHJcbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCAnZGlzdCcpO1xyXG5jb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgJ3B1YmxpYycpO1xyXG5cclxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5fX0RFVl9fID09PSAndHJ1ZSc7XHJcbi8vIHNldCB0aGlzIGZsYWcgdG8gdHJ1ZSwgaWYgeW91IHdhbnQgbG9jYWxpemF0aW9uIHN1cHBvcnRcclxuY29uc3QgbG9jYWxpemUgPSBmYWxzZTtcclxuXHJcbmNvbnN0IGV4dGVuc2lvbk1hbmlmZXN0ID0ge1xyXG4gIC4uLm1hbmlmZXN0LFxyXG4gIHZlcnNpb246IHBrZy52ZXJzaW9uLFxyXG4gIC4uLihpc0RldiA/IGRldk1hbmlmZXN0IDoge30gYXMgTWFuaWZlc3RWM0V4cG9ydCksXHJcbiAgLi4uKGxvY2FsaXplID8ge1xyXG4gICAgbmFtZTogJ19fTVNHX2V4dE5hbWVfXycsXHJcbiAgICBkZXNjcmlwdGlvbjogJ19fTVNHX2V4dERlc2NyaXB0aW9uX18nLFxyXG4gICAgZGVmYXVsdF9sb2NhbGUgOiAnZW4nXHJcbiAgfSA6IHt9KVxyXG59O1xyXG5cclxuLypcclxuKiBCeSBkZWZhdWx0IHRoaXMgdml0ZSBjb25maWcgcHJvZHVjZXMgYSBkaXN0IGZvciBjaHJvbWVcclxuKiBUbyBidWlsZCBmb3IgZmlyZWZveCBjaGFuZ2UgdGhlIFwiYnJvd3NlclwiIHByb3AgaW4gdGhlIGNyeCBjb25maWcgYmVsb3cgdG8gJ2ZpcmVmb3gnXHJcbiogQU5EIEFMU08gY2hhbmdlIHRoZSBcImJhY2tncm91bmRcIiBjb25maWcgaW4gdGhlIG1hbmlmZXN0Lmpzb24gdG8gdGhlIGZvbGxvd2luZzpcclxuKiBcclxue1xyXG4gIFwibWFuaWZlc3RfdmVyc2lvblwiOiAzLFxyXG4gIFwibmFtZVwiOiBcIjxuYW1lIGluIG1hbmlmZXN0Lmpzb24+XCIsXHJcbiAgXCJkZXNjcmlwdGlvblwiOiBcIjxkZXNjcmlwdGlvbiBpbiBtYW5pZmVzdC5qc29uPlwiLFxyXG4gIC4uLlxyXG4gIFwiYmFja2dyb3VuZFwiOiBcclxuICAgIFwic2NyaXB0c1wiOiBbIFwic2VydmljZS13b3JrZXItbG9hZGVyLmpzXCIgXVxyXG4gIH0sXHJcbiAgLi4uXHJcbn1cclxuKiBOT1RFOiByZW1vdmUgXCJ0eXBlXCIgcHJvcCBhbmQgXCJzZXJ2aWNlX3dvcmtlclwiIHByb3AgKHN0cmluZyB2YWwpIFxyXG4qIHRoZW4gcmVwbGFjZSB3aXRoIFwic2NyaXB0c1wiIHByb3AgKGFycmF5IHZhbClcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0BzcmMnOiByb290LFxyXG4gICAgICAnQGFzc2V0cyc6IGFzc2V0c0RpcixcclxuICAgICAgJ0BwYWdlcyc6IHBhZ2VzRGlyLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBjcngoe1xyXG4gICAgICBtYW5pZmVzdDogZXh0ZW5zaW9uTWFuaWZlc3QgYXMgTWFuaWZlc3RWM0V4cG9ydCxcclxuICAgICAgYnJvd3NlcjogJ2Nocm9tZScsIC8vIDwtLSBjaGFuZ2UgdmFsdWUgdG8gJ2ZpcmVmb3gnIG9yICdjaHJvbWUnXHJcbiAgICAgIGNvbnRlbnRTY3JpcHRzOiB7XHJcbiAgICAgICAgaW5qZWN0Q3NzOiB0cnVlLFxyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICAgIHN0cmlwRGV2SWNvbnMoaXNEZXYpLFxyXG4gICAgY3J4STE4bih7XHJcbiAgICAgIGxvY2FsaXplLFxyXG4gICAgICBzcmM6ICcuL3NyYy9sb2NhbGVzJ1xyXG4gICAgfSlcclxuICBdLFxyXG4gIHB1YmxpY0RpcixcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyLFxyXG4gICAgc291cmNlbWFwOiBpc0RldixcclxuICAgIGVtcHR5T3V0RGlyOiAhaXNEZXZcclxuICB9LFxyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXHNpZGVfcHJvamVjdFxcXFx2aXRlLXdlYi1leHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcc2lkZV9wcm9qZWN0XFxcXHZpdGUtd2ViLWV4dGVuc2lvblxcXFxjdXN0b20tdml0ZS1wbHVnaW5zLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RlL3NpZGVfcHJvamVjdC92aXRlLXdlYi1leHRlbnNpb24vY3VzdG9tLXZpdGUtcGx1Z2lucy50c1wiO2ltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJztcclxuXHJcbi8vIHBsdWdpbiB0byByZW1vdmUgZGV2IGljb25zIGZyb20gcHJvZCBidWlsZFxyXG5leHBvcnQgZnVuY3Rpb24gc3RyaXBEZXZJY29ucyAoaXNEZXY6IGJvb2xlYW4pIHtcclxuICBpZiAoaXNEZXYpIHJldHVybiBudWxsXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnc3RyaXAtZGV2LWljb25zJyxcclxuICAgIHJlc29sdmVJZCAoc291cmNlOiBzdHJpbmcpIHtcclxuICAgICAgcmV0dXJuIHNvdXJjZSA9PT0gJ3ZpcnR1YWwtbW9kdWxlJyA/IHNvdXJjZSA6IG51bGxcclxuICAgIH0sXHJcbiAgICByZW5kZXJTdGFydCAob3V0cHV0T3B0aW9uczogYW55LCBpbnB1dE9wdGlvbnM6IGFueSkge1xyXG4gICAgICBjb25zdCBvdXREaXIgPSBvdXRwdXRPcHRpb25zLmRpclxyXG4gICAgICBmcy5ybShyZXNvbHZlKG91dERpciwgJ2Rldi1pY29uLTMyLnBuZycpLCAoKSA9PiBjb25zb2xlLmxvZyhgRGVsZXRlZCBkZXYtaWNvbi0zMi5wbmcgZnJvbSBwcm9kIGJ1aWxkYCkpXHJcbiAgICAgIGZzLnJtKHJlc29sdmUob3V0RGlyLCAnZGV2LWljb24tMTI4LnBuZycpLCAoKSA9PiBjb25zb2xlLmxvZyhgRGVsZXRlZCBkZXYtaWNvbi0xMjgucG5nIGZyb20gcHJvZCBidWlsZGApKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gcGx1Z2luIHRvIHN1cHBvcnQgaTE4biBcclxuZXhwb3J0IGZ1bmN0aW9uIGNyeEkxOG4gKG9wdGlvbnM6IHsgbG9jYWxpemU6IGJvb2xlYW4sIHNyYzogc3RyaW5nIH0pOiBQbHVnaW5PcHRpb24ge1xyXG4gIGlmICghb3B0aW9ucy5sb2NhbGl6ZSkgcmV0dXJuIG51bGxcclxuXHJcbiAgY29uc3QgZ2V0SnNvbkZpbGVzID0gKGRpcjogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiA9PiB7XHJcbiAgICBjb25zdCBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGRpciwge3JlY3Vyc2l2ZTogdHJ1ZX0pIGFzIHN0cmluZ1tdXHJcbiAgICByZXR1cm4gZmlsZXMuZmlsdGVyKGZpbGUgPT4gISFmaWxlICYmIGZpbGUuZW5kc1dpdGgoJy5qc29uJykpXHJcbiAgfVxyXG4gIGNvbnN0IGVudHJ5ID0gcmVzb2x2ZShfX2Rpcm5hbWUsIG9wdGlvbnMuc3JjKVxyXG4gIGNvbnN0IGxvY2FsZUZpbGVzID0gZ2V0SnNvbkZpbGVzKGVudHJ5KVxyXG4gIGNvbnN0IGZpbGVzID0gbG9jYWxlRmlsZXMubWFwKGZpbGUgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWQ6ICcnLFxyXG4gICAgICBmaWxlTmFtZTogZmlsZSxcclxuICAgICAgc291cmNlOiBmcy5yZWFkRmlsZVN5bmMocmVzb2x2ZShlbnRyeSwgZmlsZSkpXHJcbiAgICB9XHJcbiAgfSlcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ2NyeC1pMThuJyxcclxuICAgIGVuZm9yY2U6ICdwcmUnLFxyXG4gICAgYnVpbGRTdGFydDoge1xyXG4gICAgICBvcmRlcjogJ3Bvc3QnLFxyXG4gICAgICBoYW5kbGVyKCkge1xyXG4gICAgICAgIGZpbGVzLmZvckVhY2goKGZpbGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVmSWQgPSB0aGlzLmVtaXRGaWxlKHtcclxuICAgICAgICAgICAgICB0eXBlOiAnYXNzZXQnLFxyXG4gICAgICAgICAgICAgIHNvdXJjZTogZmlsZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgZmlsZU5hbWU6ICdfbG9jYWxlcy8nK2ZpbGUuZmlsZU5hbWVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZmlsZS5pZCA9IHJlZklkXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSIsICJ7XHJcbiAgXCJtYW5pZmVzdF92ZXJzaW9uXCI6IDMsXHJcbiAgXCJuYW1lXCI6IFwid2ViIGV4dGVuc2lvbiBkZW1vXCIsXHJcbiAgXCJkZXNjcmlwdGlvblwiOiBcIjxkZXNjcmlwdGlvbiBpbiBtYW5pZmVzdC5qc29uPlwiLFxyXG4gIFwib3B0aW9uc191aVwiOiB7XHJcbiAgICBcInBhZ2VcIjogXCJzcmMvcGFnZXMvb3B0aW9ucy9pbmRleC5odG1sXCJcclxuICB9LFxyXG4gIFwiYmFja2dyb3VuZFwiOiB7XHJcbiAgICBcInNlcnZpY2Vfd29ya2VyXCI6IFwic3JjL3BhZ2VzL2JhY2tncm91bmQvaW5kZXgudHNcIixcclxuICAgIFwidHlwZVwiOiBcIm1vZHVsZVwiXHJcbiAgfSxcclxuICBcImFjdGlvblwiOiB7XHJcbiAgICBcImRlZmF1bHRfcG9wdXBcIjogXCJzcmMvcGFnZXMvcG9wdXAvaW5kZXguaHRtbFwiLFxyXG4gICAgXCJkZWZhdWx0X2ljb25cIjoge1xyXG4gICAgICBcIjMyXCI6IFwiaWNvbi0zMi5wbmdcIlxyXG4gICAgfVxyXG4gIH0sXHJcbiAgXCJpY29uc1wiOiB7XHJcbiAgICBcIjEyOFwiOiBcImljb24tMTI4LnBuZ1wiXHJcbiAgfSxcclxuICBcInBlcm1pc3Npb25zXCI6IFtcclxuICAgIFwiYWN0aXZlVGFiXCIsXHJcbiAgICBcImNvbnRleHRNZW51c1wiXHJcbiAgXSxcclxuICBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIFwibWF0Y2hlc1wiOiBbXHJcbiAgICAgICAgXCJodHRwOi8vKi8qXCIsXHJcbiAgICAgICAgXCJodHRwczovLyovKlwiLFxyXG4gICAgICAgIFwiPGFsbF91cmxzPlwiXHJcbiAgICAgIF0sXHJcbiAgICAgIFwianNcIjogW1xyXG4gICAgICAgIFwic3JjL3BhZ2VzL2NvbnRlbnQvaW5kZXgudHN4XCJcclxuICAgICAgXSxcclxuICAgICAgXCJjc3NcIjogW1xyXG4gICAgICAgIFwiY29udGVudFN0eWxlLmNzc1wiXHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gIFwiZGV2dG9vbHNfcGFnZVwiOiBcInNyYy9wYWdlcy9kZXZ0b29scy9pbmRleC5odG1sXCIsXHJcbiAgXCJ3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXNcIjogW1xyXG4gICAge1xyXG4gICAgICBcInJlc291cmNlc1wiOiBbXHJcbiAgICAgICAgXCJjb250ZW50U3R5bGUuY3NzXCIsXHJcbiAgICAgICAgXCJpY29uLTEyOC5wbmdcIixcclxuICAgICAgICBcImljb24tMzIucG5nXCJcclxuICAgICAgXSxcclxuICAgICAgXCJtYXRjaGVzXCI6IFtdXHJcbiAgICB9XHJcbiAgXVxyXG59XHJcbiIsICJ7XHJcbiAgXCJhY3Rpb25cIjoge1xyXG4gICAgXCJkZWZhdWx0X2ljb25cIjogXCJwdWJsaWMvZGV2LWljb24tMzIucG5nXCIsXHJcbiAgICBcImRlZmF1bHRfcG9wdXBcIjogXCJzcmMvcGFnZXMvcG9wdXAvaW5kZXguaHRtbFwiXHJcbiAgfSxcclxuICBcImljb25zXCI6IHtcclxuICAgIFwiMTI4XCI6IFwicHVibGljL2Rldi1pY29uLTEyOC5wbmdcIlxyXG4gIH0sXHJcbiAgXCJ3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXNcIjogW1xyXG4gICAge1xyXG4gICAgICBcInJlc291cmNlc1wiOiBbXHJcbiAgICAgICAgXCJjb250ZW50U3R5bGUuY3NzXCIsXHJcbiAgICAgICAgXCJkZXYtaWNvbi0xMjgucG5nXCIsXHJcbiAgICAgICAgXCJkZXYtaWNvbi0zMi5wbmdcIlxyXG4gICAgICBdLFxyXG4gICAgICBcIm1hdGNoZXNcIjogW11cclxuICAgIH1cclxuICBdXHJcbn1cclxuIiwgIntcclxuICBcIm5hbWVcIjogXCJ2aXRlLXdlYi1leHRlbnNpb25cIixcclxuICBcInZlcnNpb25cIjogXCIxLjQuMFwiLFxyXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIHNpbXBsZSBjaHJvbWUgJiBmaXJlZm94IGV4dGVuc2lvbiB0ZW1wbGF0ZSB3aXRoIFZpdGUsIFJlYWN0LCBUeXBlU2NyaXB0IGFuZCBUYWlsd2luZCBDU1MuXCIsXHJcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXHJcbiAgXCJyZXBvc2l0b3J5XCI6IHtcclxuICAgIFwidHlwZVwiOiBcImdpdFwiLFxyXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vSm9obkJyYS93ZWItZXh0ZW5zaW9uLmdpdFwiXHJcbiAgfSxcclxuICBcInNjcmlwdHNcIjoge1xyXG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcclxuICAgIFwiZGV2XCI6IFwibm9kZW1vblwiXHJcbiAgfSxcclxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcclxuICBcImRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcInJlYWN0XCI6IFwiXjE4LjMuMVwiLFxyXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMy4xXCIsXHJcbiAgICBcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjEyLjBcIlxyXG4gIH0sXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAY3J4anMvdml0ZS1wbHVnaW5cIjogXCIyLjAuMC1iZXRhLjI2XCIsXHJcbiAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCJeMC4wLjI3OFwiLFxyXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMC4xMi4xMVwiLFxyXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMy4xXCIsXHJcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMy4wXCIsXHJcbiAgICBcIkB0eXBlcy93ZWJleHRlbnNpb24tcG9seWZpbGxcIjogXCJeMC4xMC43XCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjcuOC4wXCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNy44LjBcIixcclxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeNC4yLjFcIixcclxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTlcIixcclxuICAgIFwiZXNsaW50XCI6IFwiXjguNTcuMFwiLFxyXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjkuMS4wXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4taW1wb3J0XCI6IFwiXjIuMjkuMVwiLFxyXG4gICAgXCJlc2xpbnQtcGx1Z2luLWpzeC1hMTF5XCI6IFwiXjYuOC4wXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3RcIjogXCJeNy4zNC4xXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtaG9va3NcIjogXCJeNC42LjJcIixcclxuICAgIFwiZnMtZXh0cmFcIjogXCJeMTEuMi4wXCIsXHJcbiAgICBcIm5vZGVtb25cIjogXCJeMy4xLjBcIixcclxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzhcIixcclxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjE0XCIsXHJcbiAgICBcInRzLW5vZGVcIjogXCJeMTAuOS4yXCIsXHJcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS42LjNcIixcclxuICAgIFwidml0ZVwiOiBcIl41LjQuMTBcIlxyXG4gIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStTLE9BQU8sV0FBVzs7O0FDQUYsT0FBTyxRQUFRO0FBQzlVLFNBQVMsZUFBZTtBQUR4QixJQUFNLG1DQUFtQztBQUtsQyxTQUFTLGNBQWVBLFFBQWdCO0FBQzdDLE1BQUlBLE9BQU8sUUFBTztBQUVsQixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixVQUFXLFFBQWdCO0FBQ3pCLGFBQU8sV0FBVyxtQkFBbUIsU0FBUztBQUFBLElBQ2hEO0FBQUEsSUFDQSxZQUFhLGVBQW9CLGNBQW1CO0FBQ2xELFlBQU1DLFVBQVMsY0FBYztBQUM3QixTQUFHLEdBQUcsUUFBUUEsU0FBUSxpQkFBaUIsR0FBRyxNQUFNLFFBQVEsSUFBSSx5Q0FBeUMsQ0FBQztBQUN0RyxTQUFHLEdBQUcsUUFBUUEsU0FBUSxrQkFBa0IsR0FBRyxNQUFNLFFBQVEsSUFBSSwwQ0FBMEMsQ0FBQztBQUFBLElBQzFHO0FBQUEsRUFDRjtBQUNGO0FBR08sU0FBUyxRQUFTLFNBQTJEO0FBQ2xGLE1BQUksQ0FBQyxRQUFRLFNBQVUsUUFBTztBQUU5QixRQUFNLGVBQWUsQ0FBQyxRQUErQjtBQUNuRCxVQUFNQyxTQUFRLEdBQUcsWUFBWSxLQUFLLEVBQUMsV0FBVyxLQUFJLENBQUM7QUFDbkQsV0FBT0EsT0FBTSxPQUFPLFVBQVEsQ0FBQyxDQUFDLFFBQVEsS0FBSyxTQUFTLE9BQU8sQ0FBQztBQUFBLEVBQzlEO0FBQ0EsUUFBTSxRQUFRLFFBQVEsa0NBQVcsUUFBUSxHQUFHO0FBQzVDLFFBQU0sY0FBYyxhQUFhLEtBQUs7QUFDdEMsUUFBTSxRQUFRLFlBQVksSUFBSSxVQUFRO0FBQ3BDLFdBQU87QUFBQSxNQUNMLElBQUk7QUFBQSxNQUNKLFVBQVU7QUFBQSxNQUNWLFFBQVEsR0FBRyxhQUFh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LHVCQUF1QjtBQUFBLElBQ3ZCLDZCQUE2QjtBQUFBLElBQzdCLFlBQVk7QUFBQSxJQUNaLFNBQVc7QUFBQSxJQUNYLFNBQVc7QUFBQSxJQUNYLGFBQWU7QUFBQSxJQUNmLFdBQVc7QUFBQSxJQUNYLFlBQWM7QUFBQSxJQUNkLE1BQVE7QUFBQSxFQUNWO0FBQ0Y7OztBSjVDQSxJQUFNQyxvQ0FBbUM7QUFVekMsSUFBTSxPQUFPQyxTQUFRQyxtQ0FBVyxLQUFLO0FBQ3JDLElBQU0sV0FBV0QsU0FBUSxNQUFNLE9BQU87QUFDdEMsSUFBTSxZQUFZQSxTQUFRLE1BQU0sUUFBUTtBQUN4QyxJQUFNLFNBQVNBLFNBQVFDLG1DQUFXLE1BQU07QUFDeEMsSUFBTSxZQUFZRCxTQUFRQyxtQ0FBVyxRQUFRO0FBRTdDLElBQU0sUUFBUSxRQUFRLElBQUksWUFBWTtBQUV0QyxJQUFNLFdBQVc7QUFFakIsSUFBTSxvQkFBb0I7QUFBQSxFQUN4QixHQUFHO0FBQUEsRUFDSCxTQUFTLGdCQUFJO0FBQUEsRUFDYixHQUFJLFFBQVEsdUJBQWMsQ0FBQztBQUFBLEVBQzNCLEdBQUksV0FBVztBQUFBLElBQ2IsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLElBQ2IsZ0JBQWlCO0FBQUEsRUFDbkIsSUFBSSxDQUFDO0FBQ1A7QUFxQkEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUE7QUFBQSxNQUNULGdCQUFnQjtBQUFBLFFBQ2QsV0FBVztBQUFBLE1BQ2I7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGNBQWMsS0FBSztBQUFBLElBQ25CLFFBQVE7QUFBQSxNQUNOO0FBQUEsTUFDQSxLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0E7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxhQUFhLENBQUM7QUFBQSxFQUNoQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbImlzRGV2IiwgIm91dERpciIsICJmaWxlcyIsICJyZXNvbHZlIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInJlc29sdmUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiXQp9Cg==
