module.exports = {
    env: {
        API:'http://127.0.0.1:1337/',
        NEXT_PUBLIC_LIFF_ID: '1656313134-na2Ad8MB',
        NEXT_PUBLIC_LIFF_PROFILE_ID: '1656313134-RmejgkLB',
        SHEET_USERS_API:"https://sheet.best/api/sheets/92e7d702-2e60-4c2a-8b33-1d4dacc5c5bc",

        // GOOGLE_SHEETS_PRIVATE_KEY="MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSFuoKiq1WB6dwFyUR73m0JcNTmHgsNazWLtjT8B0QlwJS/4BXIVgVQExvmKBj72ENJuIWeIXmY9OP24xfUFE4Mf77F7JFFpVvYRBkb6kLTXayvLHrtMaXS54d+boFsYmml6OjeRF3UfS/3/o7/9qlp7QiVxsD1aaDwMAysQNO4FRa8UZumEKwihWq9Rd4umwGjNkZ6FecUylDh5f4a3uFv1RCFoP/IqBL2Y165QEitUZfDgfsUWhp2KUu05DU2UWPx6t1ter5LwZ+SjKfnYj2rE4xASGfUqPQ6hYdeuzCh/O4YCIHAGuF9Kxnr7Nj1UCldBibcO+hBv+8GXG7xlM1AgMBAAECggEAASE1J0fscyvfD5qoQd+3KSZKDYjfrtGGSfK7dH68gUZPpmNur5y8qMIpIBsFakvPFY3eYs0zJ9MGKc1JPFJoyZKM0WUOjVSDIOXT9gVB3dIbGXKl68IZS7gRAfggZRAYXBIVEbptIa7X8XOV8bHTaKqtep+ezxGfPatkkKr04VCVY8ArdJ2zbMeBqcLrEnUa8WhMe2yMl1+MwhALMw2Q9+b3YeKdhnQCPhpNb60HJg6PYXqR39wLjFRZ9SbadqwTIaeQ1rS4HIHt4dJsdcvRKfpiXTt1Yg/lsaYyU1XxCRDYAYMkNT5LjijDl9hW2pCpwPmqBupgEZ+6olcv/vcgUQKBgQD66hMiYyK4Y51rm4lRuBbh8JdRQrK0pKupVI518fSdjPYIbIoqJzjai0+7KrqoHzK7OPQTOYrklx14eSl/XQmbJs2DV9nqOBMLDZexuPvTrDPvebJezFA3PEl2BHKjbTUiKOaDAgVJEuXE/FDAagk9X4v4RwnVZilTty9gzgib3QKBgQDWWQK4/X8EYpPQefjRp690nZeueqm16SJHqiueRIGvSGB0EZ8pK74fv0onCSkBq88Reg37VbW/exCvBVQwGerP7DCMYuf+yhTEPUM0Iq0DLrh9D+bcwU8Ad9bzmMyDeSHX+1IHeIblSiGDSJ1vS3GcOebEPM1JUk44xJDyGkurOQKBgQC8Tyo3F5G6MsC1PtDLLM63mNnnmZgG7MMMXTJhoEoGaAFKBzOWOUN4+S7IeGQHwwpO6op7Vyc/MY5jmQMk3A1WjMOWPDuGhbj9BaGANyWAEfAUXRAaB1p4ad10HhhvQIms7mc5kS2oTu90bCyqi6oNjoS8u4vMxVRkyMlc7KQXXQKBgCIiuMlHLaRAIrQvyI1y/AFBW7egt0hOIXRySFIDLPgCOcIiUEuZOMULjL6cudgXSXnKC1H8e15MNgL5gUfLyNZmEfE5iyLLgfUioII8B3ubRCw+jRCZBIDZlPTkX6WMc/RWhODFtA3t+VpUBSaFSEmN+w9Dc5n6rpRh0YeM4oIZAoGBAOuJQMriIPwiDx7fQMA+gwEc7KwW8xlkosBMVFKtKH8a6lIFS7q4i0xNawWmiH2EoEGv1VCP7+NATpcplOGaoFYgk34d++a4ff04e6+3iCKysv5s+imEVjuwMMqj/FH+zxUe1YbvHqZj8m64n1Ftzs8CPQ+68yYEAophE6z7SidP",
        // GOOGLE_SHEETS_CLIENT_EMAIL="lineapp@axiomatic-area-317510.iam.gserviceaccount.com",
        // SPREADSHEET_ID="https://docs.google.com/spreadsheets/d/1g8oRzHoC0RKSmOUzYukvQ9qmNGaIZo8WaV16HQhmL7Q/edit#gid=0"
    },
    images: {
        domains: ['profile.line-scdn.net'],
      },
      webpack: (config, options) => {
        config.node= {
        fs: 'empty',
        child_process : 'empty',
        net : 'empty',
        tls: 'empty',
      }
    
        return config
      },

  }
 