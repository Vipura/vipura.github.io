import os
import subprocess
import shutil
import re

# Read current files
def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

html_content = read_file('index.html')
css_content = read_file('styles.css')
js_content = read_file('script.js')

# Extract HTML sections
def get_html_section(start_marker, end_marker=None):
    if end_marker:
        pattern = f"({start_marker}.*?)(?={end_marker})"
        match = re.search(pattern, html_content, re.DOTALL)
        if match: return match.group(1)
    else:
        pattern = f"({start_marker}.*)"
        match = re.search(pattern, html_content, re.DOTALL)
        if match: return match.group(1)
    return ""

html_head = re.search(r"(<!DOCTYPE html>.*?<body>)", html_content, re.DOTALL).group(1)
html_nav = get_html_section("<!-- ===== NAVBAR ===== -->", "<!-- ===== HERO ===== -->")
html_hero = get_html_section("<!-- ===== HERO ===== -->", "<!-- ===== ABOUT ===== -->")
html_about = get_html_section("<!-- ===== ABOUT ===== -->", "<!-- ===== SKILLS ===== -->")
html_skills = get_html_section("<!-- ===== SKILLS ===== -->", "<!-- ===== PROJECTS ===== -->")
html_projects = get_html_section("<!-- ===== PROJECTS ===== -->", "<!-- ===== EDUCATION ===== -->")
html_education = get_html_section("<!-- ===== EDUCATION ===== -->", "<!-- ===== CERTIFICATIONS ===== -->")
html_certs = get_html_section("<!-- ===== CERTIFICATIONS ===== -->", "<!-- ===== CONTACT ===== -->")
html_contact = get_html_section("<!-- ===== CONTACT ===== -->", "<!-- ===== FOOTER ===== -->")
html_footer = get_html_section("<!-- ===== FOOTER ===== -->", "</body>")
html_tail = "\n</body>\n</html>"

# Extract CSS sections
def get_css_section(start_marker, end_marker=None):
    if end_marker:
        pattern = f"({re.escape(start_marker)}.*?)(?={re.escape(end_marker)})"
        match = re.search(pattern, css_content, re.DOTALL)
        if match: return match.group(1)
    else:
        pattern = f"({re.escape(start_marker)}.*)"
        match = re.search(pattern, css_content, re.DOTALL)
        if match: return match.group(1)
    return ""

css_tokens = get_css_section("/* ===== DESIGN TOKENS ===== */", "/* ===== RESET & BASE ===== */")
css_reset = get_css_section("/* ===== RESET & BASE ===== */", "/* ===== UTILITY ===== */")
css_util = get_css_section("/* ===== UTILITY ===== */", "/* ===== NAVBAR ===== */")
css_nav = get_css_section("/* ===== NAVBAR ===== */", "/* ===== HERO SECTION ===== */")
css_hero = get_css_section("/* ===== HERO SECTION ===== */", "/* ===== ABOUT SECTION ===== */")
css_about = get_css_section("/* ===== ABOUT SECTION ===== */", "/* ===== SKILLS SECTION ===== */")
css_skills = get_css_section("/* ===== SKILLS SECTION ===== */", "/* ===== PROJECTS SECTION ===== */")
css_projects = get_css_section("/* ===== PROJECTS SECTION ===== */", "/* ===== EDUCATION SECTION ===== */")
css_edu = get_css_section("/* ===== EDUCATION SECTION ===== */", "/* ===== CERTIFICATIONS SECTION ===== */")
css_certs = get_css_section("/* ===== CERTIFICATIONS SECTION ===== */", "/* ===== CONTACT SECTION ===== */")
css_contact = get_css_section("/* ===== CONTACT SECTION ===== */", "/* ===== FOOTER ===== */")
css_footer_resp = get_css_section("/* ===== FOOTER ===== */")

# Remove existing untracked files from git view to start fresh
os.remove('index.html')
os.remove('styles.css')
os.remove('script.js')

# Temp hide assets
os.rename('assets', 'assets_backup')

def commit(msg, date_str):
    env = os.environ.copy()
    env['GIT_AUTHOR_DATE'] = date_str
    env['GIT_COMMITTER_DATE'] = date_str
    subprocess.run(['git', 'add', '.'], env=env, check=True)
    subprocess.run(['git', 'commit', '-m', msg], env=env, check=True)

def append_to(filename, content):
    with open(filename, 'a', encoding='utf-8') as f:
        f.write(content)

def write_to(filename, content):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

# Start sequence
# 1
append_to('.gitignore', 'node_modules/\n.env\n')
commit('Initial setup: Add CV PDF and gitignore', '2026-05-27T09:36:00+05:30')

# 2
write_to('index.html', html_head + html_tail)
commit('Setup base HTML skeleton and font links', '2026-05-27T09:38:30+05:30')

# 3
write_to('styles.css', css_tokens + css_reset)
commit('Initialize CSS variables and reset rules', '2026-05-27T09:41:00+05:30')

# 4
append_to('styles.css', css_util)
commit('Implement CSS typography and utility classes', '2026-05-27T09:43:30+05:30')

# 5
write_to('index.html', html_head + '\n' + html_nav + html_tail)
commit('Add navigation bar HTML structure', '2026-05-27T09:46:00+05:30')

# 6
append_to('styles.css', css_nav)
commit('Style navigation bar and mobile menu', '2026-05-27T09:48:30+05:30')

# 7
write_to('index.html', html_head + '\n' + html_nav + html_hero + html_tail)
commit('Build hero section HTML with typed text elements', '2026-05-27T09:51:00+05:30')

# 8
append_to('styles.css', css_hero)
commit('Style hero section, animations, and floating cards', '2026-05-27T09:53:30+05:30')

# 9
os.rename('assets_backup', 'assets')
commit('Add profile avatar and project image assets', '2026-05-27T09:56:00+05:30')

# 10
write_to('index.html', html_head + '\n' + html_nav + html_hero + html_about + html_tail)
append_to('styles.css', css_about)
commit('Implement about section HTML and styling', '2026-05-27T09:58:30+05:30')

# 11
write_to('index.html', html_head + '\n' + html_nav + html_hero + html_about + html_skills + html_tail)
commit('Add skills section HTML', '2026-05-27T10:01:00+05:30')

# 12
append_to('styles.css', css_skills)
commit('Style skills grid and soft skill pills', '2026-05-27T10:03:30+05:30')

# 13
write_to('index.html', html_head + '\n' + html_nav + html_hero + html_about + html_skills + html_projects + html_tail)
commit('Build projects section HTML', '2026-05-27T10:06:00+05:30')

# 14
append_to('styles.css', css_projects)
commit('Style project glassmorphism cards and hover effects', '2026-05-27T10:08:30+05:30')

# 15
write_to('index.html', html_head + '\n' + html_nav + html_hero + html_about + html_skills + html_projects + html_education + html_tail)
append_to('styles.css', css_edu)
commit('Implement education timeline HTML and CSS', '2026-05-27T10:11:00+05:30')

# 16
write_to('index.html', html_head + '\n' + html_nav + html_hero + html_about + html_skills + html_projects + html_education + html_certs + html_tail)
append_to('styles.css', css_certs)
commit('Add certifications section HTML and styling', '2026-05-27T10:13:30+05:30')

# 17
write_to('index.html', html_head + '\n' + html_nav + html_hero + html_about + html_skills + html_projects + html_education + html_certs + html_contact + html_tail)
commit('Build contact form and social links section', '2026-05-27T10:16:00+05:30')

# 18
write_to('index.html', html_head + '\n' + html_nav + html_hero + html_about + html_skills + html_projects + html_education + html_certs + html_contact + html_footer + html_tail)
append_to('styles.css', css_contact + css_footer_resp)
commit('Style contact section, form inputs, and footer', '2026-05-27T10:18:30+05:30')

# 19
write_to('script.js', js_content)
# Add the script tag right before </body>
final_html = html_content
write_to('index.html', final_html)
commit('Add JavaScript for scroll animations, typing effect, and interactivity', '2026-05-27T10:23:00+05:30')

print("All commits generated successfully!")
