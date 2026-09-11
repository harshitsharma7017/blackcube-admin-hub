const fs = require('fs');
const glob = require('glob');

const files = [
  'src/routes/social-ads.tsx',
  'src/routes/upload-excel.tsx',
  'src/routes/audit-log.tsx',
  'src/routes/manage-data.tsx',
  'src/routes/index.tsx',
  'src/routes/import-history.tsx'
];

files.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');
  
  code = code.replace(
    /if \(typeof window === "undefined"\) return;\n\s+try \{/g,
    `if (typeof window === "undefined") return;
    if (!localStorage.getItem("auth_token")) {
      throw redirect({ to: "/sign-in", replace: true });
    }
    try {`
  );

  fs.writeFileSync(file, code);
});
