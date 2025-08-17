'use server';

export async function generateCSV() {
  try {
    // This would typically get data from the store or database
    // For now, we'll create a sample CSV
    const csvContent = `Name,Status,Species,Gender,Origin,Location
Rick Sanchez,Alive,Human,Male,Earth (C-137),Earth (C-137)
Morty Smith,Alive,Human,Male,Earth (C-137),Earth (C-137)
Summer Smith,Alive,Human,Female,Earth (C-137),Earth (C-137)
Beth Smith,Alive,Human,Female,Earth (C-137),Earth (C-137)
Jerry Smith,Alive,Human,Male,Earth (C-137),Earth (C-137)`;

    return {
      success: true,
      data: csvContent,
      filename: 'rick-and-morty-characters.csv',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
