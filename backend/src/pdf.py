import urllib.request
import io
import PyPDF2
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

# URL of the PDF file
url = "https://cwoqhbnsiqcvlwypmeaq.supabase.co/storage/v1/object/public/post/2023%20LeX%20BINUS%20-%2012%20Day%20FINAL.pdf?t=2023-04-06T05%3A35%3A42.407Z"

# Download the PDF file from the URL
user_agent = 'Mozilla/5.0'
headers = {'User-Agent': user_agent}
request = urllib.request.Request(url=url, headers=headers)
response = urllib.request.urlopen(request)
print(response)
pdf_data = response.read()

# Create a PDF reader object from the downloaded data
pdf_reader = PyPDF2.PdfFileReader(io.BytesIO(pdf_data))

# Extract the text content from each page of the PDF
text_content = ""
for page_num in range(pdf_reader.getNumPages()):
    page = pdf_reader.getPage(page_num)
    text_content += page.extractText()

# Print the extracted text content
text_content = text_content.replace('  ', ' ')
print(text_content)
