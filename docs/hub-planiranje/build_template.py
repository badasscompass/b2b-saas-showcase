import json,sys
from openpyxl import Workbook
from openpyxl.styles import Font,PatternFill,Alignment
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.utils import get_column_letter as L
S=sys.argv[1]; lists=json.load(open(S+'/lists.json',encoding='utf-8'))
wb=Workbook()
HEAD=Font(bold=True,color='FFFFFF'); FILL=PatternFill('solid',fgColor='1A4BD4'); EX=PatternFill('solid',fgColor='FFF2CC')
def tab(name,headers,example,widths):
    ws=wb.create_sheet(name)
    ws.append(headers); ws.append(example)
    for c in range(1,len(headers)+1):
        h=ws.cell(1,c); h.font=HEAD; h.fill=FILL; h.alignment=Alignment(wrap_text=True,vertical='top')
        ws.cell(2,c).fill=EX
        ws.column_dimensions[L(c)].width=widths[c-1] if c-1<len(widths) else 18
    ws.freeze_panes='B2'
    return ws
# Upute
u=wb.active; u.title='Upute'
rows=[["CARNET Hub · Planiranje tema · pozadinska tablica"],[],
["Kako radi"],
["Stranica „Planiranje teme” (public/HUB/planiranje/) čita i sprema podatke u ovu tablicu putem Apps Script web-aplikacije (Proširenja → Apps Script)."],
["Svako spremanje teme zamjenjuje sve retke te teme u listovima Teme, Priprema i Dogadjanja. Ostale teme ostaju netaknute."],
["Ako je temu u međuvremenu spremio netko drugi, stranica pita prije prepisivanja."],[],
["Pravila"],
["1. Ne mijenjajte nazive listova ni redoslijed stupaca u listovima Teme, Priprema i Dogadjanja: skripta piše po redoslijedu stupaca."],
["2. Stupce Tema ID, Stavka ID, Događanje ID i Ažurirano popunjava stranica. Ne mijenjajte ih ručno."],
["3. Ostala polja smijete uređivati i ovdje; stranica će ih pokazati pri sljedećem učitavanju teme."],
["4. Popisi: naslov stupca je naziv padajućeg izbornika na stranici, a vrijednosti ispod njega su ponuđeni izbori. Dodajte ili uklonite vrijednosti bez mijenjanja naslova."],
["5. Žuti redak s oznakom PRIMJER pokazuje očekivani oblik unosa. Skripta ga preskače; možete ga obrisati."],[],
["Oblik podataka"],
["Datumi: GGGG-MM-DD (npr. 2026-11-26). Vrijeme: HH:MM (npr. 14:00). Višestruki izbor (Kanali poziva): vrijednosti odvojene zarezom."],
]
for r in rows: u.append(r)
u['A1'].font=Font(bold=True,size=14)
for c in ('A3','A8','A15'): u[c].font=Font(bold=True)
u.column_dimensions['A'].width=120
for r in range(1,len(rows)+1): u.cell(r,1).alignment=Alignment(wrap_text=True,vertical='top')
teme=tab('Teme',["Tema ID","Tema","Zajednica","Vlasnik teme","Format teme","Planer/ica","Razdoblje od","Razdoblje do","Planirani broj događanja","Napomena","Ažurirano","Ažurirao/la"],
 ["PRIMJER","Kontinuirana podrška nastavnicima u planiranju i primjeni obrazovnih tehnologija","Nastavnička praksa i digitalne kompetencije","Odjel za razvoj i implementaciju obrazovnih sustava","Ciklus aktivacije","Ime Prezime","2026-11-16","2026-12-14",6,"Primjer retka","2026-11-09 12:00:00","Ime Prezime"],
 [10,48,34,34,18,18,13,13,12,30,19,18])
prip=tab('Priprema',["Tema ID","Korak","Stavka ID","Stavka","Vrijednost","Odgovorna osoba","Rok","Status","Napomena","Ažurirano","Poveznica","Newsletter / mailing lista"],
 ["PRIMJER","0","p0_multilab","MultiLab za susrete","MultiLab Zagreb","Ime Prezime","2026-11-17","U tijeku","Primjer retka","2026-11-09 12:00:00","",""],
 [10,7,14,40,30,20,12,16,30,19,36,14])
dog=tab('Dogadjanja',["Tema ID","Događanje ID","Naziv","Vrsta","Korak ciklusa","Voditelj/ica","Odjel","Gosti i izlagači","Publika","Očekivani broj","Datum","Početak","Trajanje","Format","Lokacija","Platforma","Snimanje","Status","Potrebni resursi","Napomena","Ažurirano"],
 ["PRIMJER","dprimjer","Susret slušanja","Susret / sastanak skupine","Korak 3 · Slušanje","Ime Prezime","Odjel za razvoj i implementaciju obrazovnih sustava","","Nastavnici OŠ i SŠ",20,"2026-11-26","14:00","90 min","Hibridno","MultiLab Zagreb","Microsoft Teams","Da","Planirano","Ljepljivi papirići, digitalna ploča","Primjer retka","2026-11-09 12:00:00"],
 [10,14,30,24,22,18,34,22,22,10,12,9,11,11,17,16,9,12,28,28,19])
pop=wb.create_sheet('Popisi')
names=list(lists.keys())
for c,n in enumerate(names,1):
    pop.cell(1,c,n).font=HEAD; pop.cell(1,c).fill=FILL
    for r,v in enumerate(lists[n],2): pop.cell(r,c,v)
    pop.column_dimensions[L(c)].width=max(14,min(48,max(len(n),*(len(v) for v in lists[n]))+2))
pop.freeze_panes='A2'
def dv(ws,col,listname,last=500):
    c=L(names.index(listname)+1)
    d=DataValidation(type='list',formula1=f"=Popisi!${c}$2:${c}$100",allow_blank=True,showErrorMessage=False)
    ws.add_data_validation(d); d.add(f"{col}2:{col}{last}")
dv(teme,'E','Format teme'); dv(prip,'H','Status stavke')
for col,n in [('D','Vrsta događanja'),('E','Korak ciklusa'),('G','Odjel'),('I','Publika'),('M','Trajanje'),('N','Format'),('O','Lokacija'),('P','Platforma'),('Q','Da/Ne'),('R','Status događanja')]: dv(dog,col,n)
out=S+'/CARNET_Hub_Planiranje_tema.xlsx'; wb.save(out); print(out)
