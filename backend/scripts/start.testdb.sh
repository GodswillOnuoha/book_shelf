#!/usr/bin/env bash

export DATABASE_URL="sqlserver://localhost:1433;database=test_book_shelf;user=sa;password=ntMyPas22rc;trustServerCertificate=true"
npx prisma db push
jest --detectOpenHandles
